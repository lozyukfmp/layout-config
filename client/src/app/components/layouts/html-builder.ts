import { Layout} from "../../models/Layout";
import {FragmentInstance} from "../../models/FragmentInstance";

export default function (layout: Layout) {
  const container = document.createElement('div');
  layout.structure.rows.forEach(row => {
    let domRow = document.createElement('div');
    domRow.classList.add("row");
    domRow.style.maxWidth = row.maxWidth;
    let filledRow = false;
    row.columns.forEach(column => {
      let domColumn = document.createElement('div');
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
  return container.innerHTML;
}

function getFragmentHtml(fragment: FragmentInstance) {
  if (fragment.fragmentType.isCustom) {
    return fragment.fragmentType.customContent;
  }
  return `<${fragment.fragmentType.renderTag} instanceId="${fragment.instanceId}"> ${fragment.fragmentType.name} </${fragment.fragmentType.renderTag}>`;
}
