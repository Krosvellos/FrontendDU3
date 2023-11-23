//@@viewOn:imports
import { Utils, createVisualComponent, useState } from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";
import Uu5Elements from "uu5g05-elements";

import Uu5Tiles from "uu5tilesg02";
import Uu5TilesControls from "uu5tilesg02-controls";
import Uu5TilesElements from "uu5tilesg02-elements";

import Tile from "../core/shopping-list-list/tile.js";

import Config from "./config/config.js";
import PositionBar from "../core/position-bar.js";

//@@viewOff:imports

//@@viewOn:constants
const CLASS_LIST = [];
// for (let item of DATA) {
//   let itemClass = item.class;
//   if (CLASS_LIST.indexOf(itemClass) === -1) CLASS_LIST.push(itemClass);
// }

const FILTER_LIST = [
  {
    key: "speciesName",
    label: "Name",
    filter: (item, value) => {
      let fragments = value.split(/[\s,.-;:_]/);
      return fragments.some((frag) => {
        let itemValue =
          typeof item.speciesName === "object" ? Utils.Language.getItem(item.speciesName) : item.speciesName;
        return itemValue.toLowerCase().indexOf(frag.toLowerCase()) !== -1;
      });
    },
    inputProps: { placeholder: { en: "Enter value", cs: "Zadejte hodnotu" } },
  },
  {
    key: "class",
    label: "Class",
    filter: (item, value) => {
      return value.some((frag) => {
        let itemValue = typeof item.class === "object" ? Utils.Language.getItem(item.class) : item.class;
        return itemValue.toLowerCase().indexOf(frag.toLowerCase()) !== -1;
      });
    },
    inputType: "select",
    inputProps: {
      multiple: true,
      itemList: CLASS_LIST.map((it) => ({ value: it, children: it })),
      placeholder: { en: "Enter value", cs: "Zadejte hodnotu" },
    },
  },
];

const SORTER_LIST = [
  {
    key: "speciesName",
    label: "Name",
    sort: (a, b) => a.speciesName.localeCompare(b.speciesName),
  },
];
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let TilesExample = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TilesExample",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [filterList, setFilterList] = useState([]);
    const [sorterList, setSorterList] = useState([]);

    function onFilterChange(e) {
      setFilterList(e.data.filterList);
    }

    function onSorterChange(e) {
      setSorterList(e.data.sorterList);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider
        data={props.shoppingDataList.data || []}
        filterDefinitionList={FILTER_LIST}
        filterList={filterList}
        onFilterChange={onFilterChange}
        sorterDefinitionList={SORTER_LIST}
        sorterList={sorterList}
        onSorterChange={onSorterChange}
      >
        <Uu5Elements.Block
          card={"full"}
          header={"Shopping list"}
          actionList={[
            { component: <Uu5TilesControls.FilterButton /> },
            { component: <Uu5TilesControls.SorterButton /> },
            { component: <Uu5TilesControls.SearchButton /> },
            { icon: "uugds-reload", onClick: props.shoppingDataList.handlerMap.load },
          ]}
          footer={<Uu5TilesControls.Counter />}
          disabled={props.shoppingDataList.state.includes("pending")}
        >
          <Uu5TilesControls.FilterBar initialExpanded />
          <Uu5TilesControls.SorterBar initialExpanded />
          {props.shoppingDataList.state === "pendingNoData" && <Uu5Elements.Skeleton width="100%" height="200px" />}
          {(props.shoppingDataList.state === "pending" || props.shoppingDataList.state.includes("ready")) && (
            <div className={Config.Css.css({ position: "relative" })}>
              <Uu5TilesElements.Grid tileMinWidth={100} tileMaxWidth={200}>
                {Tile}
              </Uu5TilesElements.Grid>
              {props.shoppingDataList.state === "pending" && (
                <div
                  className={Config.Css.css({
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    right: "0",
                    left: "0",
                    opacity: "0.5",
                    background: "grey",
                    display: "flex",
                    justifyContent: "center",
                    alingItems: "center",
                  })}
                >
                  <Uu5Elements.Pending />
                </div>
              )}
            </div>
          )}
          {props.shoppingDataList.state.includes("error") && (
            <Uu5Elements.HighlightedBox colorScheme="negative">
              {props.shoppingDataList.errorData.toString()}
            </Uu5Elements.HighlightedBox>
          )}
        </Uu5Elements.Block>
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

TilesExample = withRoute(TilesExample, { authenticated: true });

//@@viewOn:exports
export { TilesExample };
export default TilesExample;
//@@viewOff:exports