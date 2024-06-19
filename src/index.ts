import { FilePath, IEnvironment, StaticFile } from 'iceforge';

export class AsisFile extends StaticFile {
    
    constructor(filepath: FilePath) {
        super(filepath);
    }

    get name() {
        return 'AsisFile';
    }

    get filename() {
        let rv = super.filename;
        rv = rv.replace(/\.asis$/, '');
        rv = rv.replace(/(^|\/)_asis_\.(?=[^/]*$)/, '/');
        return rv;
    }

    get pluginColour() {
        return 'blue';
    }

    static async fromFile(filepath: FilePath) {
        return new AsisFile(filepath);
    }
}

const registerPlugin = async (env: IEnvironment) => {
    env.registerContentPlugin('asis', '**/*.asis', AsisFile);
    env.registerContentPlugin('asis', '**/_asis_.*', AsisFile);
};

export default registerPlugin;
