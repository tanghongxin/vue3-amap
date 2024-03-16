interface Config {
  key: string
  version: string
  plugins?: string[]
  errorHandler?: Function
}

const config: Config = {
  key: '',
  version: '',
  errorHandler: null,
  plugins: [],
};

export default config;
