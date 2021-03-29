import { readFile } from 'fs/promises';

export async function buckleParser(path, options, callback) {
    const contents = (await readFile(path)).toString();
    const optionKeys = Object.keys(options).slice(1, -2);
    let rendered = contents;

    for (const key of optionKeys) {
        if (options[key].constructor === Array) {
            const eachPattern = new RegExp(`\\[#each ${key} as ([^\\]]*)`);
            const asName = contents.match(eachPattern)[1];
            const elementPattern = new RegExp(
                `<([a-z]*)>\\[\\[${asName}\\]\\]`
            );
            const element = contents.match(elementPattern)[1];

            rendered = rendered.replace(
                `<${element}>[[${asName}]]</${element}>`,
                () => {
                    let result = '';
                    for (const item of options[key]) {
                        result += `<${element}>${item}</${element}>\n`;
                    }
                    return result;
                }
            );
            rendered = rendered
                .replace(new RegExp(`\\[#each ${key} as (.*)`), '')
                .replace('[/each]', '');
        } else {
            rendered = rendered.replace(`[[${key}]]`, options[key]);
        }
    }
    return callback(null, rendered);
}
