import { DataManager, UrlAdaptor, Query } from "@syncfusion/ej2-data";
import { BaseComponent } from "herr-core";
import { TranslateService } from "@ngx-translate/core";
import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { AlertifyService } from "src/app/_core/_service/alertify.service";
import {
  ExcelExportCompleteArgs,
  ExcelExportProperties,
  GridComponent,
  QueryCellInfoEventArgs,
} from "@syncfusion/ej2-angular-grids";
import { Tooltip } from "@syncfusion/ej2-angular-popups";
import {
  NgbModal,
  NgbModalRef,
  NgbTooltipConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute } from "@angular/router";
import { SysMenu } from "src/app/_core/_model/sys-menu";
import { MessageConstants } from "src/app/_core/_constants";
import { SysMenuService } from "src/app/_core/_service/sys-menu.service";
import { EmitType, setCulture, L10n } from "@syncfusion/ej2-base";
import { environment } from "src/environments/environment";
import { DatePipe } from "@angular/common";
import {
  FilteringEventArgs,
  highlightSearch,
} from "@syncfusion/ej2-angular-dropdowns";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-system-menu",
  templateUrl: "./system-menu.component.html",
  styleUrls: ["./system-menu.component.css"],
})
export class SystemMenuComponent extends BaseComponent implements OnInit {
  isAdmin =
    JSON.parse(localStorage.getItem("user"))?.groupCode === "ADMIN_CANCEL";
  public query: Query;

  data: DataManager;
  data2: DataManager;
  baseUrl = environment.apiUrl;
  password = "";
  modalReference: NgbModalRef;
  @ViewChild("grid") public grid: GridComponent;
  model: SysMenu;
  setFocus: any;
  locale;
  editSettings = {
    showDeleteConfirmDialog: false,
    allowEditing: false,
    allowAdding: true,
    allowDeleting: false,
    mode: "Normal",
  };
  title: any;
  fields: object = {
    text: "name",
    value: "id",
    itemCreated: (e: any) => {
      highlightSearch(e.item, this.queryString, true, "Contains");
    },
  };
  parentData: any = [];
  @ViewChild("optionModal") templateRef: TemplateRef<any>;
  @ViewChild("odsTemplate", { static: true }) public odsTemplate: any;
  public onFiltering = (e: FilteringEventArgs) => {
    // take text for highlight the character in list items.
    this.queryString = e.text;
    let query: Query = new Query();
    query =
      e.text !== "" ? query.where("name", "contains", e.text, true) : query;
    e.updateData(this.parentData, query);
  };
  queryString: string;
  queryString3: string;
  toobarParentData = [];
  toobarParentData2 = [];
  upperId2: number = 0;

  queryString2: string;
  @ViewChild("menuTypeTemplate", { static: true })
  public menuTypeTemplate: any;
  @ViewChild("parentTemplate", { static: true })
  public parentTemplate: any;
  @ViewChild("parent2Template", { static: true })
  public parent2Template: any;
  toolbarOptions = [];
  public onFiltering2 = (e: FilteringEventArgs) => {
    // take text for highlight the character in list items.
    this.queryString2 = e.text;
    let query: Query = new Query();
    query =
      e.text !== "" ? query.where("name", "contains", e.text, true) : query;
    e.updateData(this.toobarParentData, query);
  };
  public onFiltering3 = (e: FilteringEventArgs) => {
    // take text for highlight the character in list items.
    this.queryString3 = e.text;
    let query: Query = new Query();
    query =
      e.text !== "" ? query.where("name", "contains", e.text, true) : query;
    e.updateData(this.toobarParentData2, query);
  };
  upperId: number = 0;
  checked: boolean = false;
  menuType: any;

  constructor(
    private service: SysMenuService,
    public modalService: NgbModal,
    private alertify: AlertifyService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private config: NgbTooltipConfig,
    public translate: TranslateService
  ) {
    super(translate,environment.apiUrl);
    if (this.isAdmin === false) {
      config.disableTooltip = true;
    }
  }
  checkedChange(e, data, field) {
    this.model = { ...data };
    if (field === "farmGgp") {
      this.model.farmGgp = e;
    }
    if (field === "farmGp") {
      this.model.farmGp = e;
    }
    if (field === "farmPmpf") {
      this.model.farmPmpf = e;
    }
    if (field === "farmSemen") {
      this.model.farmSemen = e;
    }
    if (field === "farmNursery") {
      this.model.farmNursery = e;
    }
    if (field === "farmGrower") {
      this.model.farmGrower = e;
    }
    if (field === "status") {
      this.model.status = e;
    }
    this.service.update(this.model).subscribe(
      (res) => {
        if (res.success === true) {
          this.toast.success(this.alert.updated_ok_msg);
          this.loadData();
        } else {
          this.toast.warning(this.alert.system_error_msg);
        }
      },
      (error) => {
        this.toast.warning(this.alert.system_error_msg);
      }
    );
  }
  menuTypeChange(e) {
    if (e.isInteracted) {
      this.menuType = e.itemData.guid;
      this.loadDataByMenuType()

    }
  }
  rowDataBound(args) {
    if (args.data.status !== 1) {
      args.row.classList.add("bgcolor");
    }
  }
  dataBound() {
    this.grid.autoFitColumns();
  }
  ngOnInit() {
    this.toolbarOptions = [
      "ExcelExport",
      { template: this.odsTemplate },
      "Add",
      { template: this.menuTypeTemplate },
      { template: this.parentTemplate },
      { template: this.parent2Template },
      "Search",
    ];
    let lang = localStorage.getItem("lang");
    this.locale = lang;
    let languages = JSON.parse(localStorage.getItem("languages"));
    // setCulture(lang);
    let load = {
      [lang]: {
        grid: languages["grid"],
        pager: languages["pager"],
      },
    };
    L10n.load(load);
    this.loadToolbarParent();
    this.loadData();
    this.loadLang();
  }
  // life cycle ejs-grid
  headerCellInfo(args) {
    // if (this.isAdmin) {
    //   const toolcontent = args.cell.column.headerText;
    //   const field = args.cell.column.field;
    //   const tooltip: Tooltip = new Tooltip({
    //     content: this.keys[field]
    //  });
    //  tooltip.appendTo(args.node);
    // }
  }
  onDoubleClick(args: any): void {
    this.setFocus = args.column; // Get the column from Double click event
  }
  onCheckedChange(value) {
    this.model.status = value === true ? 1 : 0;
  }
  onngModelChange(value) {
    this.loadData();
  }
  onChange(e) {
    if (e.isInteracted) {
      this.loadToolbarParent2(e.value);
    }
  }
  onChange2(e) {
    this.upperId2 = e.value;
    if (e.value === 0) {
      this.loadData()
    } else {
      this.loadData2();
    }
  }
  actionBegin(args) {}

  loadLang() {
    this.translate.get("System Menu").subscribe((functionName) => {
      this.functionName = functionName;
    });
    this.translate.get("Print by").subscribe((printBy) => {
      this.printBy = printBy;
    });
  }
  // life cycle ejs-grid
  toolbarClick(args) {
    const functionName = this.functionName;
    const printBy = this.printBy;
    switch (args.item.id) {
      case "grid_excelexport":
        const accountName =
          JSON.parse(localStorage.getItem("user"))?.accountName || "N/A";
        const header = {
          headerRows: 3,
          rows: [
            {
              cells: [
                {
                  colSpan: 5,
                  value: `* ${functionName}`,
                  style: {
                    fontColor: "#fd7e14",
                    fontSize: 18,
                    hAlign: "Left",
                    bold: true,
                  },
                },
              ],
            },
            {
              cells: [
                {
                  colSpan: 5,
                  value: `* ${this.datePipe.transform(
                    new Date(),
                    "yyyyMMdd_HHmmss"
                  )}`,
                  style: {
                    fontColor: "#fd7e14",
                    fontSize: 18,
                    hAlign: "Left",
                    bold: true,
                  },
                },
              ],
            },
            {
              cells: [
                {
                  colSpan: 5,
                  value: `* ${printBy} ${accountName}`,
                  style: {
                    fontColor: "#fd7e14",
                    fontSize: 18,
                    hAlign: "Left",
                    bold: true,
                  },
                },
              ],
            },
          ],
        } as any;

        const fileName = `${functionName}_${this.datePipe.transform(
          new Date(),
          "yyyyMMdd_HHmmss"
        )}.xlsx`;
        const excelExportProperties: ExcelExportProperties = {
          hierarchyExportMode: "All",
          fileName: fileName,
          header: header,
        };
        this.grid.excelExport(excelExportProperties);
        break;
      case "grid_add":
        args.cancel = true;
        this.model = {} as any;
        this.openModal(this.templateRef);
        break;
      default:
        break;
    }
  }
  actionComplete(args) {}

  // end life cycle ejs-grid

  // api
  getAudit(id) {
    this.service.getAudit(id).subscribe((data) => {
      this.audit = data;
    });
  }
  loadToolbarParent() {
    this.toobarParentData = [];
    this.service
      .getToolbarParents(localStorage.getItem("lang"))
      .subscribe((data) => {
        this.toobarParentData = data;
        this.toobarParentData.unshift({
          id: 0,
          name: this.translate.instant("All"),
        });
      });
  }
  loadToolbarParent2(upperId) {
    this.toobarParentData2 = [];
    if (upperId === 0 || !upperId) return;
    this.service
      .getToolbarParentsLevel2(localStorage.getItem("lang"), upperId)
      .subscribe((data) => {
        this.toobarParentData2 = data;
        this.toobarParentData2.unshift({
          id: 0,
          name: this.translate.instant("All"),
        });
      });
  }
  loadData() {
    this.query = new Query();
    if (this.menuType) {
      this.query.where("menuType", "equal", this.menuType);
    }
    const accessToken = localStorage.getItem("token");
    this.data = new DataManager({
      url: `${this.baseUrl}SysMenu/LoadData2?upperId=${this.upperId}`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${accessToken}` }],
    }, this.query);
  }
  loadDataByMenuType() {
    this.query = new Query();
    if (this.menuType) {
      this.query.where("menuType", "equal", this.menuType);
    }
 
    const accessToken = localStorage.getItem("token");
    this.data = new DataManager({
      url: `${this.baseUrl}SysMenu/LoadData2?upperId=${this.upperId}`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${accessToken}` }],
    }, this.query);
  }

  loadData2() {
    this.query = new Query();
    if (this.menuType) {
      this.query.where("menuType", "equal", this.menuType);
    }
 
    const accessToken = localStorage.getItem("token");
    this.data = new DataManager({
      url: `${this.baseUrl}SysMenu/LoadData2?upperId=${this.upperId2}`,
      adaptor: new UrlAdaptor(),
      headers: [{ authorization: `Bearer ${accessToken}` }],
    }, this.query);
  }

  delete(id) {
    this.alertify.confirm4(
      this.alert.yes_message,
      this.alert.no_message,
      this.alert.deleteTitle,
      this.alert.deleteMessage,
      () => {
        this.service.delete(id).subscribe(
          (res) => {
            if (res.success === true) {
              this.toast.success(this.alert.deleted_ok_msg);
              this.loadData();
            } else {
              this.toast.warning(this.alert.system_error_msg);
            }
          },
          (err) => this.toast.warning(this.alert.system_error_msg)
        );
      },
      () => {
        this.toast.error(this.alert.cancelMessage);
      }
    );
  }
  create() {
    this.alertify.confirm4(
      this.alert.yes_message,
      this.alert.no_message,
      this.alert.createTitle,
      this.alert.createMessage,
      () => {
        this.service.add(this.model).subscribe(
          (res) => {
            if (res.success === true) {
              this.toast.success(this.alert.created_ok_msg);
              this.loadData();
              this.modalReference.dismiss();
            } else {
              this.toast.warning(this.alert.system_error_msg);
            }
          },
          (error) => {
            this.toast.warning(this.alert.system_error_msg);
          }
        );
      },
      () => {
        this.toast.error(this.alert.cancelMessage);
      }
    );
  }
  update() {
    this.alertify.confirm4(
      this.alert.yes_message,
      this.alert.no_message,
      this.alert.updateTitle,
      this.alert.updateMessage,
      () => {
        this.service.update(this.model).subscribe(
          (res) => {
            if (res.success === true) {
              this.toast.success(this.alert.updated_ok_msg);
              this.loadData();
              this.modalReference.dismiss();
            } else {
              this.toast.warning(this.alert.system_error_msg);
            }
          },
          (error) => {
            this.toast.warning(this.alert.system_error_msg);
          }
        );
      },
      () => {
        this.toast.error(this.alert.cancelMessage);
      }
    );
  }
  ngModelChange(value) {
    this.model.upperId = value || "";
  }
  public onSelect(args: any): void {}

  // end api
  NO(index) {
    return (
      (this.grid.pageSettings.currentPage - 1) *
        this.grid.pageSettings.pageSize +
      Number(index) +
      1
    );
  }
  save() {
    if (this.model.id > 0) {
      this.update();
    } else {
      this.create();
    }
  }
  openModal(template, data = {} as SysMenu) {
    this.service.getParents(localStorage.getItem("lang")).subscribe((data) => {
      this.parentData = data;
    });
    this.model = { ...data };
    if (this.model.id > 0) {
      this.title = "SYSTEM_MENU_EDIT_MODAL";
      this.getAudit(this.model.id);
      this.checked = data.status === 1 ? true : false;
    } else {
      this.title = "SYSTEM_MENU_ADD_MODAL";
      this.model.id = 0;
      this.model.upperId = this.upperId2 > 0 ? this.upperId2 : this.upperId;
      this.checked = true;
    }
    this.modalReference = this.modalService.open(template, { size: "xl" });
  }
  odsExport() {
    const functionName = this.functionName;
    const printBy = this.printBy;
    const accountName =
      JSON.parse(localStorage.getItem("user"))?.accountName || "N/A";
    const header = {
      headerRows: 3,
      rows: [
        {
          cells: [
            {
              colSpan: 5,
              value: `* ${functionName}`,
              style: {
                fontColor: "#fd7e14",
                fontSize: 18,
                hAlign: "Left",
                bold: true,
              },
            },
          ],
        },
        {
          cells: [
            {
              colSpan: 5,
              value: `* ${this.datePipe.transform(
                new Date(),
                "yyyyMMdd_HHmmss"
              )}`,
              style: {
                fontColor: "#fd7e14",
                fontSize: 18,
                hAlign: "Left",
                bold: true,
              },
            },
          ],
        },
        {
          cells: [
            {
              colSpan: 5,
              value: `* ${printBy} ${accountName}`,
              style: {
                fontColor: "#fd7e14",
                fontSize: 18,
                hAlign: "Left",
                bold: true,
              },
            },
          ],
        },
      ],
    } as any;

    const fileName = `${functionName}_${this.datePipe.transform(
      new Date(),
      "yyyyMMdd_HHmmss"
    )}.ods`;
    const excelExportProperties: ExcelExportProperties = {
      hierarchyExportMode: "All",
      fileName: fileName,
      header: header,
    };

    this.isodsExport = true;

    this.grid.excelExport(excelExportProperties, null, null, true);
  }
  excelExpComplete(args: ExcelExportCompleteArgs) {
    if (this.isodsExport) {
      const fileName = `${this.functionName}_${this.datePipe.transform(
        new Date(),
        "yyyyMMdd_HHmmss"
      )}.ods`;

      args.promise.then((e: { blobData: Blob }) => {
        const model = {
          functionName: fileName,
          file: e.blobData,
        };
        this.service.downloadODSFile(model).subscribe((res: any) => {
          this.service.downloadBlob(
            res.body,
            fileName,
            "application/vnd.oasis.opendocument.spreadsheet"
          );
        });
      });
    }
  }
}
