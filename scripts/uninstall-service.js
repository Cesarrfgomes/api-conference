const Service = require('node-windows').Service

console.log('Uninstalling API Conference Service...')

const svc = new Service({
	name: 'API Conference',
	script: 'dist/app.js'
})

// Listen for the uninstall event
svc.on('uninstall', function () {
	console.log('✅ Service uninstalled successfully!')
	console.log(
		'API Conference service has been removed from Windows services.'
	)
	process.exit(0)
})

// Listen for the error event
svc.on('error', function (err) {
	console.error('❌ Service error:', err)
	process.exit(1)
})

// Uninstall the service
svc.uninstall()
