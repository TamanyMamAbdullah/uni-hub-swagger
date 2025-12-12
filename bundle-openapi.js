/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const BASE_DIR = __dirname;
const SHARED_FILE = path.join(BASE_DIR, 'shared.yaml');
const MODULES_DIR = path.join(BASE_DIR, 'modules');
const OUTPUT_FILE = path.join(BASE_DIR, 'dist', 'openapi.yaml');
const OUTPUT_JSON = path.join(BASE_DIR, 'dist', 'openapi.json');

// Read and parse YAML file
function readYaml(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return yaml.load(content);
}

// Main bundling function
function bundleOpenAPI() {
  console.log('🚀 Starting OpenAPI bundling...');

  // Read the main openapi.yaml (base structure)
  const baseSpec = {
    openapi: '3.0.3',
    info: {
      title: 'Uni Hub API',
      version: '1.0.0',
      description: 'Modular OpenAPI spec for Uni Hub'
    },
    servers: [
      {
        url: 'https://api.unihub.example.com/api/v1',
        description: 'Production'
      },
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Local Development'
      }
    ],
    paths: {},
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {}
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  };

  // Read shared components
  console.log('📦 Reading shared components...');
  const sharedSpec = readYaml(SHARED_FILE);
  
  // Merge shared schemas into base
  if (sharedSpec.components && sharedSpec.components.schemas) {
    baseSpec.components.schemas = {
      ...baseSpec.components.schemas,
      ...sharedSpec.components.schemas
    };
  }

  // Read all module files
  const moduleFiles = [
    'auth.yaml',
    'users.yaml',
    'posts.yaml',
    'messages.yaml',
    'qa.yaml',
    'events.yaml',
    'marketplace.yaml',
    'resources.yaml',
    'notifications.yaml',
    'moderation.yaml'
  ];

  moduleFiles.forEach(moduleFile => {
    const modulePath = path.join(MODULES_DIR, moduleFile);
    
    if (!fs.existsSync(modulePath)) {
      console.log(`⚠️  Skipping ${moduleFile} (not found)`);
      return;
    }

    console.log(`📄 Processing ${moduleFile}...`);
    const moduleSpec = readYaml(modulePath);

    // Merge paths
    if (moduleSpec.paths) {
      Object.keys(moduleSpec.paths).forEach(pathKey => {
        // Remove the /api/v1 prefix if it exists in the module
        const cleanPath = pathKey.replace(/^\/api\/v1/, '');
        baseSpec.paths[cleanPath] = moduleSpec.paths[pathKey];
      });
    }

    // Merge component schemas if they exist in the module
    if (moduleSpec.components && moduleSpec.components.schemas) {
      baseSpec.components.schemas = {
        ...baseSpec.components.schemas,
        ...moduleSpec.components.schemas
      };
    }
  });

  // Resolve all $ref references to shared.yaml
  const resolvedSpec = resolveRefs(baseSpec, sharedSpec);

  // Create dist directory if it doesn't exist
  if (!fs.existsSync(path.join(BASE_DIR, 'dist'))) {
    fs.mkdirSync(path.join(BASE_DIR, 'dist'), { recursive: true });
  }

  // Write YAML output
  console.log('💾 Writing bundled YAML...');
  const yamlOutput = yaml.dump(resolvedSpec, {
    indent: 2,
    lineWidth: -1,
    noRefs: true,
    sortKeys: false,
    quotingType: '"',
    forceQuotes: false
  });
  fs.writeFileSync(OUTPUT_FILE, yamlOutput, 'utf8');

  // Write JSON output
  console.log('💾 Writing bundled JSON...');
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(resolvedSpec, null, 2));

  console.log('✅ Bundling complete!');
  console.log(`📁 YAML output: ${OUTPUT_FILE}`);
  console.log(`📁 JSON output: ${OUTPUT_JSON}`);
  console.log(`📊 Total paths: ${Object.keys(resolvedSpec.paths).length}`);
  console.log(`📊 Total schemas: ${Object.keys(resolvedSpec.components.schemas).length}`);
}

// Function to resolve $ref references
function resolveRefs(spec, sharedSpec) {
  const resolved = JSON.parse(JSON.stringify(spec));

  function traverse(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;

    if (obj.$ref && typeof obj.$ref === 'string') {
      // Handle references to shared.yaml
      if (obj.$ref.includes('../shared.yaml#/components/schemas/')) {
        const schemaName = obj.$ref.split('/').pop();
        return { $ref: `#/components/schemas/${schemaName}` };
      }
    }

    // Recursively traverse
    for (const key in obj) {
      obj[key] = traverse(obj[key]);
    }

    return obj;
  }

  return traverse(resolved);
}

// Run the bundler
try {
  bundleOpenAPI();
} catch (error) {
  console.error('❌ Error bundling OpenAPI:', error);
//   process.exit(1);
}