export interface Plugin {
  id: string;
  name: string;
  render: () => JSX.Element;
}

export const pluginRegistry: Plugin[] = [];

export const registerPlugin = (plugin: Plugin) => {
  pluginRegistry.push(plugin);
};
