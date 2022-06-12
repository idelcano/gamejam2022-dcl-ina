import { GlobalVariables } from "./Global/globalValues";
import { Level } from "./levels/level";
import { Level0 } from "./levels/level0";
import { Level1 } from "./levels/level1";
import { Level2 } from "./levels/level2";

//common for all the maps:
//engine.addEntity(border);

const level1 : Level = new Level0()
GlobalVariables.level1 = new Level1()
GlobalVariables.level2 = new Level2()
level1.start()
GlobalVariables.level = level1