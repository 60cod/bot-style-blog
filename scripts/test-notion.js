// Simple test script to validate Notion API integration
// This can be run locally with: node scripts/test-notion.js

// Load environment variables from .env.local file
const fs = require('fs');
const path = require('path');

function loadEnvLocal() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0 && !key.startsWith('#')) {
        const value = valueParts.join('=').trim();
        process.env[key.trim()] = value;
      }
    });
  }
}

loadEnvLocal();

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const DATABASE_ID = '263e8f191da280e189b0cb74f37d38a7';
const API_VERSION = '2022-06-28';

async function testNotionAPI() {
  if (!NOTION_TOKEN) {
    console.error('❌ NOTION_TOKEN environment variable is not set');
    console.log('Please set NOTION_TOKEN in your environment variables or .env.local file');
    process.exit(1);
  }

  console.log('🔍 Testing Notion API connection...');
  
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': API_VERSION,
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log('✅ Notion API connection successful!');
    console.log(`📊 Found ${data.results?.length || 0} articles`);
    
    if (data.results && data.results.length > 0) {
      const firstArticle = data.results[0];
      console.log('📝 Sample article:');
      console.log(`   Title: ${firstArticle.properties?.article_title?.title?.[0]?.plain_text || 'No title'}`);
      console.log(`   Category: ${firstArticle.properties?.article_category?.select?.name || 'No category'}`);
      console.log(`   Tags: ${firstArticle.properties?.article_tags?.multi_select?.map(tag => tag.name).join(', ') || 'No tags'}`);
    }

    return true;
  } catch (error) {
    console.error('❌ Notion API test failed:');
    console.error('   Error:', error.message);
    
    if (error.message.includes('401')) {
      console.log('💡 This usually means:');
      console.log('   - Invalid NOTION_TOKEN');
      console.log('   - Token doesn\'t have access to the database');
    } else if (error.message.includes('404')) {
      console.log('💡 This usually means:');
      console.log('   - Database ID is incorrect');
      console.log('   - Database is not shared with the integration');
    }
    
    return false;
  }
}

// Run the test
testNotionAPI()
  .then(success => {
    if (success) {
      console.log('🎉 All tests passed! Your Notion integration is ready.');
    } else {
      process.exit(1);
    }
  })
  .catch(error => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });