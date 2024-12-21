import {
  AdvancedMarker,
  ControlPosition,
  Map,
  MapControl,
} from "@vis.gl/react-google-maps";
import AnyReactComponent from "components/AnyReactComponent/AnyReactComponent";
import { CarDataType, ExperiencesDataType, StayDataType } from "data/types";
import { FC } from "react";
import Checkbox from "shared/Checkbox/Checkbox";

interface MapContainerProps {
  currentHoverID: string | number;
  DEMO_DATA: CarDataType[] | ExperiencesDataType[] | StayDataType[];
  listingType: "car" | "experiences" | "stay";
}

const MapContainer: FC<MapContainerProps> = ({
  currentHoverID = -1,
  DEMO_DATA,
  listingType,
}) => {
  return (
    <>
      {/* BELLOW IS MY GOOGLE API KEY -- PLEASE DELETE AND TYPE YOUR API KEY */}
      <Map
        style={{
          width: "100%",
          height: "100%",
        }}
        defaultZoom={12}
        defaultCenter={DEMO_DATA[0].map}
        gestureHandling={"greedy"}
        mapId={process.env.REACT_APP_GOOGLE_MAP_ID}
      >
        <MapControl position={ControlPosition.TOP_CENTER}>
          <div className="mt-5 py-2 px-4 bg-neutral-100 dark:bg-neutral-900 shadow-xl z-10 rounded-2xl min-w-max">
            <Checkbox
              className="text-xs xl:text-sm text-neutral-800"
              name="search_as_i_move"
              label="Search as I move the map"
            />
          </div>
        </MapControl>
        {DEMO_DATA.map((item) => (
          <AdvancedMarker
            key={item.id}
            position={item.map}
            clickable
            onClick={() => console.log("clicked")}
          >
            <AnyReactComponent
              isSelected={currentHoverID === item.id}
              key={item.id}
              lat={item.map.lat}
              lng={item.map.lng}
              car={listingType === "car" ? (item as CarDataType) : undefined}
              experiences={
                listingType === "experiences"
                  ? (item as ExperiencesDataType)
                  : undefined
              }
              listing={
                listingType === "stay" ? (item as StayDataType) : undefined
              }
            />
          </AdvancedMarker>
        ))}
      </Map>
    </>
  );
};

export default MapContainer;
