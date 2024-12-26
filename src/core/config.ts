interface Config {
  key: string;
  version: string;
  plugins?: string[];
  errorHandler?: (err: Error) => void;
}

const config: Config = {
  key: '',
  version: '',
  errorHandler: null,
  plugins: [],
};

export default config;
