Ractive.components.droparea = Ractive.extend({
	isolated: true,
	template: "<div class='droparea {{#if dropping}}dropping{{/if}} {{class}} ' style='{{style}}'\
		on-dragenter='dragenter'\
		on-dragleave='dragleave'\
		on-dragover='dragover'\
		on-dragstart='dragstart'\
		on-drag='drag'\
		on-dragexit='dragexit'\
		on-dragleave='dragleave'\
		on-dragend='dragend'\
		on-drop='drop'\
		>{{ yield }}</div>",
	onrender: function() {
		var $this = this
		this.timeout = null;

		this.on({
			// Fired when a dragged element or text selection enters a valid drop target.
			dragenter: function(e) { console.log('dragenter', e ); $this.set('dropping', true  ) },

			// Fired when a dragged element or text selection leaves a valid drop target.
			dragleave: function(e) { console.log('dragleave', e ); /*$this.set('dropping', false )*/ },

			// Fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds).
			dragover:  function(e) { console.log('dragover', e );  $this.set('dropping', true ); e.original.preventDefault()  },

			// Fired when the user starts dragging an element or text selection.
			dragstart: function(e) { console.log('dragstart', e )  },

			// Fired when an element or text selection is being dragged.
			drag: function(e) { console.log('drag', e )  },

			// Fired when an element is no longer the drag operation's immediate selection target.
			dragexit: function(e) { console.log('dragexit', e )  },

			// Fired when a drag operation is being ended (for example, by releasing a mouse button or hitting the escape key)
			dragend:  function(e) { console.log('dragend', e )  }, // Fired when a drag operation is being ended (for example, by releasing a mouse button or hitting the escape key)

			// Fired when an element or text selection is dropped on a valid drop target.
			drop: function(e) {
				$this.set('dropping', false )
				e.original.preventDefault()
				$this.fire('file-upload',e) // e.original.dataTransfer.files[0]
			},
		})
	}
})
