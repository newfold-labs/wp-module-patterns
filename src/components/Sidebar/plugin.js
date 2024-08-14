import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/editor';
import { Fragment } from '@wordpress/element';

import { __ } from '@wordpress/i18n';

const WonderBlocksEditorPlugin = () => (
    <Fragment>
        <PluginSidebarMoreMenuItem
            target="wonderblocks-sidebar"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
          </svg>
          }
        >
            {__('WonderBlocks', 'wp-module-patterns')}
        </PluginSidebarMoreMenuItem>
        <PluginSidebar
            name="wonderblocks-sidebar"
            title={__('WonderBlocks', 'wp-module-patterns')}
            className="wonderblocks-sidebar"
        >
            <p>{__('WonderBlocks Sidebar', 'wp-module-patterns')}</p>
        </PluginSidebar>
    </Fragment>
)

export default WonderBlocksEditorPlugin;