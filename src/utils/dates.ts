import { addDays, format, isToday, isWeekend, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';

export interface FormattedDayItem {
  date: Date;
  /** Identificador único en formato YYYY-MM-DD */
  key: string;
  /** Día de la semana en formato corto capitalizado (ej: "Lun", "Mar", "Mié") */
  dayOfWeek: string;
  /** Día de la semana en formato completo (ej: "Lunes", "Martes") */
  fullDayOfWeek: string;
  /** Día del mes en número (ej: "24", "1") */
  dayNumber: string;
  /** Mes en formato corto capitalizado (ej: "Ago", "Sep") */
  month: string;
  /** Nombre completo del mes capitalizado (ej: "Agosto", "Septiembre") */
  fullMonth: string;
  /** Año de 4 dígitos */
  year: number;
  /** Indica si la fecha corresponde a hoy */
  isToday: boolean;
  /** Indica si es sábado o domingo */
  isWeekend: boolean;
}

/**
 * Función auxiliar para capitalizar la primera letra y limpiar puntos de abreviaciones en español
 */
function capitalizeFirst(text: string): string {
  const cleanText = text.replace(/\.$/, '');
  if (!cleanText) return '';
  return cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
}

/**
 * Obtiene el día de la semana formateado en español (ej: "Lun" o "Lunes")
 */
export function getDayOfWeek(
  date: Date,
  formatType: 'short' | 'full' = 'short'
): string {
  const pattern = formatType === 'short' ? 'EEE' : 'EEEE';
  return capitalizeFirst(format(date, pattern, { locale: es }));
}

/**
 * Obtiene el día del calendario en número (ej: "24")
 */
export function getDayNumber(date: Date): string {
  return format(date, 'd');
}

/**
 * Obtiene el mes en español (ej: "Ago" o "Agosto")
 */
export function getMonthName(
  date: Date,
  formatType: 'short' | 'full' = 'short'
): string {
  const pattern = formatType === 'short' ? 'MMM' : 'MMMM';
  return capitalizeFirst(format(date, pattern, { locale: es }));
}

/**
 * Obtiene una clave única en formato YYYY-MM-DD
 */
export function formatDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Extrae todos los datos desglosados de una fecha específica
 */
export function extractDayInfo(date: Date): FormattedDayItem {
  const normalizedDate = startOfDay(date);
  return {
    date: normalizedDate,
    key: formatDateKey(normalizedDate),
    dayOfWeek: getDayOfWeek(normalizedDate, 'short'),
    fullDayOfWeek: getDayOfWeek(normalizedDate, 'full'),
    dayNumber: getDayNumber(normalizedDate),
    month: getMonthName(normalizedDate, 'short'),
    fullMonth: getMonthName(normalizedDate, 'full'),
    year: normalizedDate.getFullYear(),
    isToday: isToday(normalizedDate),
    isWeekend: isWeekend(normalizedDate),
  };
}

export interface GenerateDaysOptions {
  /** Fecha base desde donde empezar. Por defecto: hoy */
  startDate?: Date;
  /** Cantidad de días a generar. Por defecto: 30 */
  count?: number;
  /** Desplazamiento en días desde la fecha inicial. Útil para paginación incremental */
  offsetDays?: number;
}

/**
 * Genera un arreglo de objetos `Date` puros para el rango solicitado
 */
export function generateDateRange(options: GenerateDaysOptions = {}): Date[] {
  const { startDate = new Date(), count = 30, offsetDays = 0 } = options;
  const initialDate = startOfDay(addDays(startDate, offsetDays));

  return Array.from({ length: count }, (_, index) =>
    addDays(initialDate, index)
  );
}

/**
 * Genera un arreglo de días con la información desglosada y lista para renderizar
 */
export function generateDayItems(
  options: GenerateDaysOptions = {}
): FormattedDayItem[] {
  const dates = generateDateRange(options);
  return dates.map(extractDayInfo);
}

/**
 * Clase/Manejador para gestionar la carga incremental o infinita de días (batching)
 */
export class DayBatchGenerator {
  private baseDate: Date;
  private batchSize: number;
  private currentOffset: number;

  constructor(baseDate: Date = new Date(), batchSize: number = 30) {
    this.baseDate = startOfDay(baseDate);
    this.batchSize = batchSize;
    this.currentOffset = 0;
  }

  /**
   * Obtiene el siguiente lote de fechas desglosadas
   */
  public nextBatch(): FormattedDayItem[] {
    const items = generateDayItems({
      startDate: this.baseDate,
      count: this.batchSize,
      offsetDays: this.currentOffset,
    });
    this.currentOffset += this.batchSize;
    return items;
  }

  /**
   * Reinicia el generador a la fecha base
   */
  public reset(newBaseDate?: Date): void {
    if (newBaseDate) {
      this.baseDate = startOfDay(newBaseDate);
    }
    this.currentOffset = 0;
  }

  /**
   * Retorna el número total de días generados hasta el momento
   */
  public get generatedCount(): number {
    return this.currentOffset;
  }
}
