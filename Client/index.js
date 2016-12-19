process.chdir(__dirname);
require(`./scripts/${process.argv[2]}.js`)();
