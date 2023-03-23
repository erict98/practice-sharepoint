import {
  IDynamicDataPropertyDefinition,
  IDynamicDataCallables,
} from "@microsoft/sp-dynamic-data";

import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import styles from "./SourceWebPart.module.scss";

export interface ISourceWebPartProps {}

export interface IEvent {
  name: string;
}

export default class SourceWebPart
  extends BaseClientSideWebPart<ISourceWebPartProps>
  implements IDynamicDataCallables
{
  private _selectedEvent: IEvent;

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [
      {
        id: "name",
        title: "Name",
      },
      {
        id: "upper",
        title: "Upper Name"
      }
    ];
  }

  public getPropertyValue(propertyId: string): IEvent {
    console.log(propertyId)
    switch (propertyId) {
      case "name":
        return this._selectedEvent;
      case "upper":
        return { name: this._selectedEvent.name.toUpperCase() }
    }
    throw new Error("Bad property id");
  }

  private _eventSelected = (event: IEvent): void => {
    this._selectedEvent = event;
    this.context.dynamicDataSourceManager.notifyPropertyChanged("name");
  };

  protected render(): void {
    this.domElement.innerHTML = `<div class="${styles.source}">
    <input type="text" id="input" value="Eric">
    <button type="button" id="button">submit</button> 
    </div>`;

    const input = document.getElementById("input") as HTMLInputElement;
    const button = document.getElementById("button") as HTMLElement;
    button.addEventListener("click", () => {
      this._eventSelected({
        name: input.value,
      });
    });
    this._selectedEvent = { name: "Example" }
    this.context.dynamicDataSourceManager.notifyPropertyChanged("name");
  }

  protected onInit(): Promise<void> {
    this.context.dynamicDataSourceManager.initializeSource(this);
    return Promise.resolve();
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }
}
