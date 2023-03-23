import {
  BaseClientSideWebPart,
  IWebPartPropertiesMetadata,
} from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField,
} from "@microsoft/sp-property-pane";
import { DynamicProperty } from "@microsoft/sp-component-base";

import { Version } from "@microsoft/sp-core-library";

export interface IConsumerWebPartProps {
  name: DynamicProperty<string>;
}

export default class ConsumerWebPart extends BaseClientSideWebPart<IConsumerWebPartProps> {
  public render(): void {
    console.log(this.properties.name.tryGetSource())
    //console.log(this.context.dynamicDataProvider.getAvailableSources())
    //console.log(this.properties.name)
    const eventData: string | undefined = this.properties.name.tryGetValue();
    this.domElement.innerHTML = eventData;
  }

  protected onInit(): Promise<void> {
    return super.onInit();
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'name': {
        dynamicPropertyType: "string",
      }
    };
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneDynamicFieldSet({
                  label: "Name",
                  fields: [
                    PropertyPaneDynamicField("name", {
                      label: "Event source",
                    }),
                  ],
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
