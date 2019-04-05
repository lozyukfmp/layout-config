const jsdom = require("jsdom");

export default function (layout) {
    const container = jsdom.createElement('div');
    layout.structure.rows.forEach(row => {
        const domRow = jsdom.createElement('div');
        domRow.classList.add('row');
        domRow.style.maxWidth = row.maxWidth;
        let filledRow = false;
        row.columns.forEach(column => {
            const domColumn = jsdom.createElement('div');
            domColumn.className = column.cssClass;
            if (column.fragments.length > 0) {
                column.fragments.forEach(fragment => {
                    domColumn.innerHTML += getFragmentHtml(fragment);
                });
                filledRow = true;
            }
            domRow.appendChild(domColumn);
        });
        if (filledRow) {
            container.appendChild(domRow);
        }
    });
    return container.innerHTML != '' ? container.innerHTML : '<span stub></span>';
}

function getFragmentHtml(fragment: FragmentInstance) {
    if (fragment.fragmentSchema.isCustom) {
        return fragment.fragmentSchema.customContent;
    }
    return `<${fragment.fragmentSchema.renderTag} instanceId="${fragment.instanceId}"> ${fragment.fragmentSchema.name} </${fragment.fragmentSchema.renderTag}>`;
}
