//Jeremy Lafond
'use strict';
let wave;
let LitDock;
let cloud;
let dock;
let tile_wave;
let tile_LitDock;
let tile_cloud;
let tile_dock;

let worldSeed;
let HASH = XXH.h32(7);
let clicks = [];
let cloudSpot = [];
let dockSpot = [];

function myPreload() 
{
    wave = loadImage("wave.png");
    LitDock = loadImage("dockLight.png");
    cloud = loadImage("cloud.png");
    dock = loadImage("dock.png");
}

function mySetup() 
{
    tile_wave = createGraphics(sprite_width, sprite_height);
    tile_wave.image(wave,0,0);
    tile_LitDock = createGraphics(sprite_width, sprite_height);
    tile_LitDock.image(LitDock,0,0);
    tile_cloud = createGraphics(sprite_width, sprite_height);
    tile_cloud.image(cloud,0,0);
    tile_dock = createGraphics(sprite_width, sprite_height);
    tile_dock.image(dock,0,0);
}

function myDraw() 
{
	var hash= HASH.update(worldSeed).digest().toNumber(7);
  	noiseSeed(hash);
    background(33,83,191);
}

function myTileHeight(i, j) 
{
	if(noise(i,j)>0.85 && noise(i,j) <= 1.0)
	{
		cloudSpot.push(i);
		cloudSpot.push(j);

		for(var m = 0; m < cloudSpot.length; m+=2)
		{
			if(i == cloudSpot[m] && j == cloudSpot[m+1])
			{
				return 10; //clouds
			}
		}
	}

	if(noise(i,j) > .75 && noise(i,j) <= 0.85)
	{
		dockSpot.push(i); //dock with lights
		dockSpot.push(j);
		//clicking a dock removes light
		if(clicks.length>0)
		{
			for(var m = 0; m < clicks.length; m += 2)
			{
				if(i == clicks[m] && j == clicks[m + 1])
				{
					return 2.5; //dock no light
				}
			}
		}
		return 2.6; //dock with light
	}
    return cos(sin(noise(i)*(millis()/200)*noise(j))); //waves
}

function myTileVariation(i, j, height) 
{
	if(height == 2.5)
	{
		return "dock";
	}
	if(height == 2.6)
	{
		return "LitDock";
	}
	if(height == 10)
	{
		return "cloud";
	}
	else
	{
		return "wave";
	}
}
function myDrawTile(i, j, variation) 
{
    if(variation == "LitDock")
     {
        image(LitDock,0,0);
     }
     if(variation == "dock")
     {
     	image(tile_dock,0,0);
     }
     if(variation == "cloud")
     {
        image(tile_cloud,0,5*sin(millis()/500));
     }
     else
     {
     	image(tile_wave,0,0);
     }
}

function myTileDescription(i,j, variation) {
    return "Variation: " + variation;
}

function myHandleClick(i, j) 
{
	clicks.push(i);
	clicks.push(j);
}

function myHandleWorldgenStringChange(key) 
{
	worldSeed = key;
}
