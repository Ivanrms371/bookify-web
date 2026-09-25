const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getFiles(dir) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    return dirent.isDirectory() ? getFiles(res) : res;
  });
  return Array.prototype.concat(...files);
}

const files = getFiles('./src').filter(
  (f) => f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.astro')
);

const replacements = [
  { from: /@\/components\/ui/g, to: '@/shared/components/ui' },
  { from: /@\/components\/typography/g, to: '@/shared/components/typography' },
  { from: /@\/components\/providers/g, to: '@/shared/components/providers' },
  {
    from: /@\/components\/booking/g,
    to: '@/features/booking/components/booking-wizard',
  },
  {
    from: /@\/components\/business\/BusinessFooter\.astro/g,
    to: '@/features/tenant/sections/BusinessFooter.astro',
  },
  {
    from: /@\/components\/business\/BusinessHeader\.astro/g,
    to: '@/features/tenant/sections/BusinessHeader.astro',
  },
  {
    from: /@\/components\/business\/BusinessInfo\.astro/g,
    to: '@/features/tenant/sections/BusinessInfo.astro',
  },
  {
    from: /@\/components\/business\/Professionals\.astro/g,
    to: '@/features/tenant/sections/Professionals.astro',
  },
  {
    from: /@\/components\/business\/ProfessionalList\.astro/g,
    to: '@/features/tenant/sections/Professionals.astro',
  },
  {
    from: /@\/components\/business\/Services\.astro/g,
    to: '@/features/tenant/sections/Services.astro',
  },
  {
    from: /@\/components\/business\/ServiceList\.astro/g,
    to: '@/features/tenant/sections/Services.astro',
  },
  { from: /@\/api\/tenants/g, to: '@/features/tenant/api/tenant-api' },
  { from: /getTenantBySlug/g, to: 'tenantApi.getTenantBySlug' },
  { from: /@\/api\/client/g, to: '@/shared/api/client' },
  { from: /@\/utils\/cn/g, to: '@/utils/cn' }, // wait cn is still missing
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  for (const r of replacements) {
    if (r.from.test(content)) {
      content = content.replace(r.from, r.to);
      changed = true;
    }
  }

  // Also replace any generic @/components/ui
  if (content.includes('@/shared/components/ui/')) {
    content = content.replace(
      /@\/components\/ui\//g,
      '@/shared/components/ui/'
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
  }
}

console.log('Done!');
