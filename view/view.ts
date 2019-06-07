namespace $ {
	
	export function $mol_view_visible_width() {
		return $mol_window.size().width
	}
	
	export function $mol_view_visible_height() {
		return $mol_window.size().height
	}
	
	export function $mol_view_state_key( suffix : string ) {
		return suffix
	}

	/// Reactive statefull lazy ViewModel
	export class $mol_view extends $mol_object {
		
		@ $mol_atom2_field
		static get Root() {
			return $mol_atom2_dict({
				get: ( id : number )=> new this
			})
		}

		static autobind() {
			
			const nodes = $mol_dom_context.document.querySelectorAll( '[mol_view_root]' )
			
			for( let i = nodes.length - 1 ; i >= 0 ; --i ) {
				const name = nodes.item( i ).getAttribute( 'mol_view_root' )!
				
				const View = $[ name ]
				if( !View ) {
					console.error( `Can not attach view. Class not found: ${ name }` )
					continue
				}
				
				const view = View.Root[ i ]
				
				$mol_atom2_autorun(()=>{
					view.dom_node( nodes.item( i ) )
					view.dom_tree()
					document.title = view.title()
				})
			}
			
		}
		
		title() : string {
			return this.constructor.toString()
		}
		
		@ $mol_mem
		focused( next?: boolean ) {
			let node = this.dom_node()
			const value = $mol_view_selection.focused( next === undefined ? undefined : ( next ? [ node ] : [] ) )
			return value.indexOf( node ) !== -1
		} 
		
		state_key( suffix = '' ) {
			return this.$.$mol_view_state_key( suffix )
		}
		
		/// Name of element that created when element not found in DOM
		dom_name() {
			return this.constructor.toString().replace( '$' , '' )
		}
		
		/// NameSpace of element that created when element not found in DOM
		dom_name_space() { return 'http://www.w3.org/1999/xhtml' }
		
		/// Raw child views
		sub() {
			return null as readonly ($mol_view|Node|string|number|boolean)[] | null
		}
		
		/// Visible sub views with defined ambient context
		/// Render all by default
		sub_visible() {

			const sub = this.sub()
			if( !sub ) return sub
			
			const context = this.$$

			sub.forEach( child => {
				if( child instanceof $mol_view ) {
					child.$ = context
				}
			} )
			
			return sub
		}
		
		/// Minimal width that used for lazy rendering
		@ $mol_mem
		minimal_width() {
			const sub = this.sub()
			if( !sub ) return 0
			
			let min = 0
			sub.forEach( view => {
				if( view instanceof $mol_view ) {
					min = Math.max( min , view.minimal_width() )
				}
			} )
			
			return min
		}
		
		/// Minimal height that used for lazy rendering
		minimal_height() {
			return this.content_height()
		}

		@ $mol_mem
		content_height() {
			const sub = this.sub()
			if( !sub ) return 0
			
			let min = 0
			sub.forEach( view => {
				if( view instanceof $mol_view ) {
					min = Math.max( min , view.minimal_height() )
				}
			} )
			
			return min
		}

		dom_id() {
			return this.toString()
		}
		
		@ $mol_mem
		dom_node( next? : Element ) {
			
			const node = next || $mol_dom_context.document.createElementNS( this.dom_name_space() , this.dom_name() )

			node.setAttribute( 'id' , this.dom_id() )
			$mol_dom_render_attributes( node , this.attr_static() )
			
			const events = this.event()
			for( let event_name in events ) {
				node.addEventListener(
					event_name ,
					$mol_fiber_root( $mol_log_group( `${ this } ${ name }` , events[ event_name ] ) ) ,
					{ passive : false } as any ,
				)
			}

			return node
		}
		
		@ $mol_mem
		dom_tree( next? : Element ) : Element {
			const node = this.dom_node( next )
			
			try {
				
				for( let plugin of this.plugins() ) {
					plugin.dom_node( node )
					plugin.render()
				}
				this.render()
				
			} catch( error ) {
				
				
				if( error instanceof Promise ) $mol_fail_hidden( error )
				$mol_dom_render_attributes( node , { mol_view_error : error.name } )
				// return node
				
				try { void( ( node as HTMLElement ).innerText = error.message ) } catch( e ) {}
				
				console.error( error )
			}
			
			return node
		}

		@ $mol_mem
		dom_node_actual() {
			const node = this.dom_node()

			$mol_dom_render_attributes( node , this.attr() )
			$mol_dom_render_styles( node , this.style() )
			
			return node
		}
		
		render() {
			const node = this.dom_node_actual()
			
			const sub = this.sub_visible()
			if( sub ) {

				const nodes = sub.map( child => {
					if( child == null ) return null
					return ( child instanceof $mol_view ) ? child.dom_node_actual() : String( child )
				})
				
				$mol_dom_render_children( node , nodes )
				
				for( const el of sub ) if( el && typeof el === 'object' && 'dom_tree' in el ) el['dom_tree']()
				
			}
			
			const fields = this.field()
			$mol_dom_render_fields( node , fields )
			
		}

		@ $mol_mem
		static view_classes() {
			const proto = this.prototype
			
			let current = proto
			const classes = [] as ( typeof $mol_view )[]
			
			while( current ) {
				classes.push( current.constructor as typeof $mol_view )
				if(!( current instanceof $mol_view )) break
				current = Object.getPrototypeOf( current )
			}
			
			return classes
		}
		
		view_names_owned() {
			const names = [] as string[]
			let owner = $mol_owning_get( this , $mol_view )

			if( owner instanceof $mol_view ) {

				const suffix = this[ $mol_object_field ]
				const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1)
				
				for( let Class of ( owner.constructor as typeof $mol_view ).view_classes() ) {
					if( suffix in Class.prototype ) names.push( $mol_func_name( Class ) + suffix2 )
					else break
				}
				
				for( let prefix of owner.view_names_owned() ) {
					names.push( prefix + suffix2 )
				}
			}

			return names
		}

		@ $mol_mem
		view_names() {
			const names = [] as string[]
			
			for( let name of this.view_names_owned() ) {
				if( names.indexOf( name ) < 0 ) names.push( name )
			}

			for( let Class of ( this.constructor as typeof $mol_view ).view_classes() ) {
				const name = $mol_func_name( Class )
				if( names.indexOf( name ) < 0 ) names.push( name )
			}

			return names
		}
		
		attr_static() : { [ key : string ] : string|number|boolean } {
			let attrs : any = {}
			
			for( let name of this.view_names() ) attrs[ name.replace( /\$/g , '' ).toLowerCase() ] = ''
			
			return attrs
		}
		
		attr() : { [ key : string ] : string|number|boolean } {
			return {
				'mol_view_error' : false ,
			}
		}
		
		style() : { [ key : string ] : string|number } {
			return {}
		}
		
		field() : { [ key : string ] : any } {
			return {}
		}
		
		event() : { [ key : string ] : ( event : Event )=> void } {
			return {}
		}
		
		@ $mol_deprecated( 'Use $mol_view::event instead.' )
		event_async() : { [ key : string ] : ( event : Event )=> void } {
			return {}
		}
		
		plugins() {
			return [] as readonly $mol_view[]
		}

	}
	
}
