import {
  GeModelChangeEvent,
  GeMouseEvent,
  SimpleDomService,
  TableModelIf,
  TableOptions,
  TableScope
} from "@guiexpert/table";

export class TableComponent extends HTMLElement {

  public static observedAttributes = [];


  setData(tableModel: TableModelIf, tableOptions: TableOptions) {
    console.info("set data", tableModel);

    this.innerHTML = `
     <div
      class="container-div"
      style="width: 100%, height: 100%, backgroundColor: transparent, padding: 0, margin: 0; display: block"></div>
    `;
    console.info("set data", this.innerHTML);

    const ele = this.querySelector("div") as HTMLDivElement;
    console.info("ele", ele);

    const domService = new SimpleDomService();
    if (tableModel) {

      const listener = {
        onCheckboxChanged: (evt: any[]) => {
          const e = new CustomEvent("checkboxChanged", { detail: evt, bubbles: true });
          ele.dispatchEvent(e);
        },

        onContextmenu: (evt: GeMouseEvent) => {
          const e = new CustomEvent("contextmenu", { detail: evt, bubbles: true });
          ele.dispatchEvent(e);
        },

        onModelChanged: (evt: GeModelChangeEvent) => {
          const e = new CustomEvent("modelChanged", { detail: evt, bubbles: true });
          ele.dispatchEvent(e);
        },

        onMouseClicked: (evt: GeMouseEvent) => {
          const e = new CustomEvent("mouseClicked", { detail: evt, bubbles: true });
          ele.dispatchEvent(e);
        },

        onMouseDragging: (evt: GeMouseEvent) => {
          const e = new CustomEvent("mouseDragging", { detail: evt, bubbles: true });
          ele.dispatchEvent(e);
        },

        onMouseDraggingEnd: (evt: GeMouseEvent) => {
          const e = new CustomEvent("mouseDraggingEnd", { detail: evt, bubbles: true });
          ele.dispatchEvent(e);
        },

        onMouseMoved: (evt: GeMouseEvent) => {
          const e = new CustomEvent("mouseMoved", { detail: evt, bubbles: true });
          ele.dispatchEvent(e);
        }
      };

      const tableScope = new TableScope(
        ele, tableModel, domService, tableOptions, listener
      );
      domService.setStyle(ele, "height", "100%");
      tableScope.firstInit();

      const e = new CustomEvent("tableReady", { detail: tableScope.getApi(), bubbles: true });
      ele.dispatchEvent(e);
    }
  }
}

customElements.define("guiexpert-table", TableComponent);
