const Service = require('node-windows').Service
const path = require('path')

// Get the current directory
const currentDir = process.cwd()
const scriptPath = path.join(currentDir, 'dist/app.js')

console.log('Installing API Conference Service...')
console.log('Script path:', scriptPath)

const svc = new Service({
	name: 'API Conference',
	description:
		'Papa Materiais API Conference Service - Gerenciamento de conferência e cálculos de preços',
	script: scriptPath,
	nodeOptions: [],
	env: [
		{
			name: 'NODE_ENV',
			value: 'prod'
		},
		{
			name: 'PORT',
			value: '3333'
		}
	]
})

// Listen for the install event
svc.on('install', function () {
	console.log('✅ Service installed successfully!')
	console.log('Starting service...')
	svc.start()
})

// Listen for the start event
svc.on('start', function () {
	console.log('✅ Service started successfully!')
	console.log('API Conference is now running as a Windows service.')
	console.log('You can access the API at: http://localhost:3333')
	console.log('Swagger documentation at: http://localhost:3333/documentation')
	console.log('')
	console.log('Service management commands:')
	console.log('  Start:   npm run start-service')
	console.log('  Stop:    npm run stop-service')
	console.log('  Remove:  npm run uninstall-service')
	process.exit(0)
})

// Listen for the error event
svc.on('error', function (err) {
	console.error('❌ Service error:', err)
	process.exit(1)
})

// Install the service
svc.install()
