const fs = require('fs');
const path = require('path');

const INSTANCE_ZUID = process.env.ZESTY_INSTANCE_ZUID;
const TOKEN = process.env.ZESTY_DEVELOPER_TOKEN;
const BRANCH = process.env.BRANCH || 'stage';
const MANUAL_PUBLISH = process.env.MANUAL_PUBLISH === 'true';

const BASE_URL = `https://${INSTANCE_ZUID}.api.zesty.io/v1`;
const CONFIG_PATH = path.join(process.cwd(), 'zesty.config.json');

let config;
try {
  config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
} catch (err) {
  console.error('❌ Could not read zesty.config.json');
  process.exit(1);
}

async function updateFile(localPath, fileConfig) {
  if (!fs.existsSync(localPath)) {
    console.warn(`⚠️  File not found: ${localPath}`);
    return;
  }

  const content = fs.readFileSync(localPath, 'utf8');
  const { zuid, type = 'view' } = fileConfig;

  let endpoint;
  if (type === 'stylesheet') endpoint = `/web/stylesheets/${zuid}`;
  else if (type === 'script') endpoint = `/web/scripts/${zuid}`;
  else endpoint = `/web/views/${zuid}`;

  console.log(`💾 Saving ${localPath} → ${type} (${zuid})`);

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code: content }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to save ${localPath}: ${res.status} ${errorText}`);
  }

  console.log(`✅ Saved ${localPath}`);
}

async function publishFile(localPath, fileConfig) {
  const { zuid, type = 'view' } = fileConfig;
  let endpoint;
  if (type === 'stylesheet') endpoint = `/web/stylesheets/${zuid}/publishings`;
  else if (type === 'script') endpoint = `/web/scripts/${zuid}/publishings`;
  else endpoint = `/web/views/${zuid}/publishings`;

  console.log(`🚀 Publishing ${localPath} to production...`);

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}), // Zesty uses latest version by default
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.warn(`⚠️  Publish failed for ${localPath}: ${res.status} ${errorText}`);
  } else {
    console.log(`✅ Published ${localPath} to production`);
  }
}

async function main() {
  if (!INSTANCE_ZUID || !TOKEN) {
    console.error('❌ Missing ZESTY_INSTANCE_ZUID or ZESTY_DEVELOPER_TOKEN in secrets');
    process.exit(1);
  }

  const shouldPublish = BRANCH === 'production' || MANUAL_PUBLISH;
  console.log(`🚀 Zesty Deploy started | Branch: ${BRANCH} | Publish to prod: ${shouldPublish}`);

  // Save all mapped files (or you can optimize later with git diff)
  for (const [localPath, fileConfig] of Object.entries(config.files || {})) {
    await updateFile(localPath, fileConfig);
  }

  // Publish specific files to production
  if (shouldPublish && config.publish_on_main) {
    console.log('\n📤 Publishing selected files to production...');
    for (const localPath of config.publish_on_main) {
      if (config.files[localPath]) {
        await publishFile(localPath, config.files[localPath]);
      }
    }
  }

  console.log('\n🎉 Zesty deploy complete!');
}

main().catch(err => {
  console.error('💥 Error:', err.message);
  process.exit(1);
});