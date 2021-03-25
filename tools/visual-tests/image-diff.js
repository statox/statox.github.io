import fs from 'fs';
import path from 'path';
import pixelmatch from 'pixelmatch';
import pngjs from 'pngjs';

const {PNG} = pngjs;

const walk = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function (err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

const makeDiff = (dir1, dir2, filename, destination) => {
    const file1 = `${dir1}/${filename}`;
    const file2 = `${dir2}/${filename}`;
    const img1 = PNG.sync.read(fs.readFileSync(file1));
    const img2 = PNG.sync.read(fs.readFileSync(file2));
    const {width: width1, height: height1} = img1;
    const {width: width2, height: height2} = img2;
    console.log({file1, width1, height1, file2, width2, height2});
    const diff = new PNG({width1, height1});

    pixelmatch(img1.data, img2.data, diff.data, width1, height1, {threshold: 0.1});

    fs.writeFileSync(`${destination}/${filename}`, PNG.sync.write(diff));
};

export const generateDiffs = (dir1, dir2, destinationPath) => {
    console.log('pouet 1');
    if (!destinationPath) {
        throw new Error('destinationPath expected');
    }
    console.log('pouet 2');
    try {
        fs.rmdirSync(destinationPath, {recursive: true});
        fs.mkdirSync(destinationPath);
    } catch (error) {
        console.log(error);
    }
    console.log('pouet 3');

    try {
        fs.statSync(destinationPath);
    } catch (error) {
        console.log(`destinationPath ${destinationPath} directory not found. ABORT`);
        console.log(error);
        process.exit(1);
    }
    console.log('pouet 4');
    walk(dir1, async function (err, results) {
        console.log('pouet 5');
        if (err) throw err;
        const reg = new RegExp(`.*${dir1}\\/`);
        const paths = results.map(p => p.replace(reg, ''));
        console.log(`Paths to screenshot: ${paths.length}`);

        for (const p of paths) {
            console.log(`Diffing ${p}`);
            makeDiff(dir1, dir2, p, destinationPath);
        }

        console.log('Done all screenshots');
        process.exit(0);
    });
};
