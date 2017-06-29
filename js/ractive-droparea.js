Ractive.components.droparea = Ractive.extend({
	isolated: true,
	template: "<div class='{{class}} {{#if dropping}}dropping{{/if}}' style='{{style}}'\
		on-dragenter='dragenter'\
		on-dragover='dragover'\
		on-drop='drop'\
		on-dragleave='dragexit'\
		>\
		{{#if dropping}}{{else}}{{ yield }}{{/if}}</div>",
	onrender: function() {
		this.on({
			'dragenter': function(e) { this.set('dropping', true  ) },
			'dragexit':  function(e) { this.set('dropping', false ) },
			'dragover':  function(e) { e.original.preventDefault()  },
			'drop': function(e) {
				this.set('dropping', false )
				e.original.preventDefault()
				this.root.fire('file-upload',e) // e.original.dataTransfer.files[0]
			},
		})
	}
})
