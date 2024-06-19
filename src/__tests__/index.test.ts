import { describe, expect, test, vi } from 'vitest';
import { Config, Environment, IConfig } from 'iceforge';
import * as winston from 'winston';

import registerPlugin, { AsisFile } from '../index.ts';

const testLogger = winston.createLogger({
    exitOnError: true,
    silent: true
});

describe('AsisFile class tests', () => {
    test('Constructor sets filepath property', () => {
        const testInput = { full: '/tmp/test', relative: 'test' };
        
        const testOutput = new AsisFile(testInput);

        expect(testOutput.filepath).toStrictEqual(testInput);
    });
    
    test('name property equals AsisFile', () => {
        const testInput = { full: '/tmp/test', relative: 'test' };
        
        const testOutput = new AsisFile(testInput);

        expect(testOutput.name).toBe('AsisFile');
    });

    test('filename property has correct value if filename ends in .asis', () => {
        const testInput = { full: '/tmp/test.jpg.asis', relative: 'test.jpg.asis' };

        const testObject = new AsisFile(testInput);

        expect(testObject.filename).toBe('test.jpg');
    });

    test('filename property has correct value if filename starts with _asis_.', () => {
        const testInput = { full: '/tmp/test.jpg.asis', relative: '_asis_.test.jpg' };

        const testObject = new AsisFile(testInput);

        expect(testObject.filename).toBe('/test.jpg');
    });

    test('filename property has correct value if filename in subfolder starts with _asis_', () => {
        const testInput = { full: '/tmp/subdir/test.jpg.asis', relative: 'subdir/_asis_.test.jpg' };

        const testObject = new AsisFile(testInput);

        expect(testObject.filename).toBe('subdir/test.jpg');
    });
    
    test('pluginColour property equals blue', () => {
        const testInput = { full: '/tmp/test', relative: 'test' };
        
        const testOutput = new AsisFile(testInput);

        expect(testOutput.pluginColour).toBe('blue');
    });
    
    test('fromFile() function returns instance with correct filepath property', async () => {
        const testInput = { full: '/tmp/test', relative: 'test' };

        const testOutput = await AsisFile.fromFile(testInput);

        expect(testOutput.filepath).toStrictEqual(testInput);
    });
});

describe('Plugin registration tests', () => {
    test('registerPlugin() registers the .asis pattern', async () => {
        const env = await Environment.factory(new Config() as IConfig, 'testDir', testLogger);
        const spy = vi.spyOn(env, 'registerContentPlugin');

        await registerPlugin(env);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('asis', '**/*.asis', AsisFile);
    });

    test('registerPlugin() registers the __asis__ pattern', async () => {
        const env = await Environment.factory(new Config() as IConfig, 'testDir', testLogger);
        const spy = vi.spyOn(env, 'registerContentPlugin');

        await registerPlugin(env);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('asis', '**/_asis_.*', AsisFile);
    });
});
