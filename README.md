#  Space Marine Junaid

[![Build Status](https://travis-ci.org/nightblade9/space-marine-junaid-reactjs.svg?branch=master)](https://travis-ci.org/nightblade9/space-marine-junaid-reactjs)

Metroid-inspired roguelike made in ReactJS. Succeeded by [the C# version](https://github.com/deengames/space-marine-junaid).

# Notes

- Prototype #1 checks performance with raw JS and the DOM. Renders 40x22 at ~6FPS on my dev machine.
  - Adding colour or changing the font size used doesn't change the FPS
  - Making the number of things we're rendering more/less drastically impacts the FPS.

# Game Design and Content Plan

- **Goal:** Ship something small, like *really* small. The design is uncertain, the technical feasability is very proof-of-concept.
- Backstory: ship attacked, crashed on planet, beat the queen (maybe she stole a critical ship part).
- 10 floors in total
	- The first eight floors are four pairs of new-skill, master-skill
	- The ninth floor combines everything together
	- The tenth/final floor adds a final boss

- The four skills for the four floors:
	- Charge attack (waits a turn, additional knockback and maybe splash)
	- Bomb attack: bombs an area around you and destroys walls/blocks
	- Rocket: like a launchable bomb, explosive area damage
	- Freeze: 
		- Freezes enemies (unkillable shadows who don't die but disappear when out-of-sight)
		- When shot over liquids (lava/water), freezes them for a few turns
	- (optional) space jump: jumps ~3 tiles.
	- Other optional upgrades like health, power/damage, etc.
