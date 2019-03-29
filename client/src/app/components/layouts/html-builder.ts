import {Layout} from "../../models/Layout";
import {environment} from "../../../environments/environment";
import {Fragment} from "../../models/Fragment";

export default function (layout: Layout) {
  const html = document.createElement('html');
  const head = document.createElement('head');
  head.innerHTML += `<title>${environment.htmlTitle}</title>`;
  head.innerHTML += `<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0">`;
  head.innerHTML += `<link rel="stylesheet" href="http://${environment.instanceHost}:${environment.layoutServicePort}/resources/layout-styles.css">`;
  head.innerHTML += `<link rel="icon" type="image/x-icon" href="http://${environment.instanceHost}:${environment.layoutServicePort}/resources/favicon.ico">`;
  if (layout.structure.headFragments.length > 0) {
    layout.structure.headFragments.forEach(fragment => {
      head.innerHTML += getFragmentHtml(fragment);
    })
  }
  head.innerHTML += `<script>var event_bus_global;</script>`;
  html.appendChild(head);
  const body = document.createElement('body');
  body.innerHTML = "";
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
      body.appendChild(domRow);
    }
  });
  html.appendChild(body);
  return html.innerHTML;
}

function getFragmentHtml(fragment: Fragment) {
  if (fragment.isCustom) {
    return fragment.customContent;
  }
  const attribute = fragment.attribute != '' ? fragment.attribute : '';
  return `${fragment.renderTag} <fragment src="${fragment.url}" ${attribute}></fragment>`;

}
