import React from 'react';

export interface Plugin {
  id: string;
  name: string;
  render: () => React.JSX.Element;
}

export const pluginRegistry: Plugin[] = [];

export const registerPlugin = (plugin: Plugin) => {
  pluginRegistry.push(plugin);
};
