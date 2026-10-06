import { useState } from "react"
import type { BuildingType, TileType } from "../types/Map"
import { useMapStore } from "../store/useMapStore"

type TilePropsType = {
  tile: TileType,
  rowIdx: number,
  colIdx: number
}

const Tile = ({tile,colIdx,rowIdx}:TilePropsType) => {

  const selectedBuilding = useMapStore((state) => state.selectedBuilding)

  const buildingIcon = (building: BuildingType) => {
    let icon = "";
    switch (building) {
      case "farm":
        icon = "🛖"; break;
      case "house":
        icon = "🏠"; break;
      case "lumber":
        icon = "🪓"; break;
      case "mine":
        icon = "⛏️"; break;
      default: break;
    }
    return icon;
  }

  const [building, setBuilding] = useState<BuildingType | null>(null)

  const canBuild = () => {
    if(tile.building || selectedBuilding == null) return false

    switch (selectedBuilding) {
      case "farm": return tile.ground == "grass";
      case "house": return tile.ground == "grass";
      case "lumber": return tile.ground == "grass";
      case "mine": return tile.ground == "stone";    
      default: return false;
    }
  }

  const build = () => {
    if(!canBuild()){alert("Nem lehet építeni te hüje"); return}
    
    setBuilding(selectedBuilding)
  }

  const hoverTile = (e: React.MouseEvent) => {
    const div = e.target as HTMLElement;
    const style = canBuild() ? "1px solid lime" : "1px solid red"
    div.style.border = style;
  }

  const leaveTile = (e: React.MouseEvent) => {
    const div = e.target as HTMLElement;
    div.style.border = "none";
  }

  return (
    <div onMouseOver={(e)=>hoverTile(e)} onMouseLeave={(e)=>leaveTile(e)} onClick={build} className={tile.ground} title={`${rowIdx}|${colIdx}`}>
      {building && buildingIcon(building)}
    </div>
  )
}

export default Tile