import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

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

async function screenshot(uri, destinationPath) {
    const pathStr = uri.replace(/\//g, '_');
    const filePath = `${destinationPath}/${pathStr}.png`;

    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    await page.goto(`http://localhost:8080/${uri}`, {waitUntil: 'networkidle0'});
    await page.screenshot({path: filePath, fullPage: true});

    await browser.close();
}

export const makeScreenshots = async destinationPath => {
    if (!destinationPath) {
        throw new Error('destinationPath expected');
    }
    try {
        fs.rmdirSync(destinationPath, {recursive: true});
        fs.mkdirSync(destinationPath);
    } catch (error) {
        console.log(error);
    }

    try {
        fs.statSync(destinationPath);
    } catch (error) {
        console.log(`destinationPath ${destinationPath} directory not found. ABORT`);
        console.log(error);
        process.exit(1);
    }

    walk('./docs/', async function (err, results) {
        if (err) throw err;
        const paths = results.filter(p => p.match(/.*html/)).map(p => p.replace(/.*docs\//, ''));
        console.log(`Paths to screenshot: ${paths.length}`);

        for (const p of paths) {
            console.log(`Screenshotting ${p}`);
            await screenshot(p, destinationPath).catch(error => {
                console.log('Error');
                console.log(error);
            });
        }

        console.log('Done all screenshots');
        process.exit(0);
    });
};
