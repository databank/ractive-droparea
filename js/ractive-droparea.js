Ractive.components.droparea = Ractive.extend({
	isolated: true,
	template: "<div class='droparea {{#if dropping}}dropping{{/if}} {{class}} ' style='{{style}}'\
		on-dragenter='dragenter'\
		on-dragleave='customdragleave'\
		on-dragover='dragover'\
		on-drop='drop'\
		>{{ yield }}</div>",
	onrender: function() {
		var $this = this
		this.timeout = null;

		this.on({
			// Fired when a dragged element or text selection enters a valid drop target.
			dragenter: function(e) {
				//console.log('dragenter' );
				$this.set('dropping', true  )
				clearTimeout($this.timeout)
			},

			// Fired when a dragged element or text selection leaves a valid drop target.
			customdragleave: function(e) {
				//console.log('custom-dragleave');
				$this.timeout = setTimeout(function() {
					$this.fire('dragleave', e )
				}, 100 )
			},

			dragleave: function(e) {
				//console.log('dragleave');
				$this.set('dropping', false )
			},

			// Fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds).
			dragover:  function(e) {
				//console.log('dragover', e );
				$this.set('dropping', true );
				clearTimeout($this.timeout)
				e.original.preventDefault()
			},

			// Fired when the user starts dragging an element or text selection.
			//dragstart: function(e) { console.log('dragstart', e )  },

			// Fired when an element or text selection is being dragged.
			//drag: function(e) { console.log('drag', e )  },

			// dragexit - no ractive plugin

			// Fired when a drag operation is being ended (for example, by releasing a mouse button or hitting the escape key)
			//dragend:  function(e) { console.log('dragend', e )  }, // Fired when a drag operation is being ended (for example, by releasing a mouse button or hitting the escape key)

			// Fired when an element or text selection is dropped on a valid drop target.
			drop: function(e) {
				$this.set('dropping', false )
				e.original.preventDefault()
				$this.fire('file-upload',e) // e.original.dataTransfer.files[0]
			},
		})
	}
})
