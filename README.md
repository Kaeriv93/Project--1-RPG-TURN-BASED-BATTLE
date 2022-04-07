# Project--1-RPG-TURN-BASED-BATTLE
Here we will be creating a RPG styled turned based battle system. 


User Stories
1. The game will open up with a modal showing some dialogue between the characters
2. After the dialogue has been run, the game will initiate and the music will que.
3. In here you will have control of your 2 heroes that are aiming to defeat the boss.
4. Making turns will alternate between your characters as well as the boss.
5. Be careful as you can only make 1 move per character, for example if you decided to attack
you will not be able to heal or block.
6. A menu item will only be visible ONCE it is that characters turn
7. The menu will consist of an ATTACK -(Attack the enemy) Block -(reduce damage) Magic-(A powerful skill that uses Mana points) -Items(this will hide the rest of the menu and display which items you can use! Careful though, if you don't have any items then you WILL NOT be able to use it.)
8. The bottom of the screen will display your character's HP (health points if it reachs 0 they will be inactive) and your character's MP (Mana points needed to use a skill, otherwise cannot be activated).
9. You will successfully complete the game if you are able to beat the boss OR lose if he defeats you.
10. A damage counter will be displayed above or next to each player, if they are attacked.
11. At the bottom will display the action that has occured.
12. Enjoy and have fun!

MVP GOALS
1. As a user I will be introduce to an open screen that will display some dialogue.
2. After reading the dialogue I will click out and the game will commence.
3. I want our heroes to start first and be able to make a move before the boss does.
4. I want our action buttons to only appear when it is our turn.
6. I want our characters to be display close to one another and have the boss on the other side.
5. The boss will be able to attack 1 of 2, or even both of my heroes during his turn.
6. I want the game to end only if both of my heroes hp reach 0, or if the boss hp reaches 0.
7. A game over screen will display if we lose, a winning message if we win.
8. I want to be able to display who's turn it is
9. I want to be able to display a damage counter over or next to a character if they were to get hit.
10. I want my characters to appear animated(Use of gifs via spritesheets)
11. I want there to be a small chance of a critical hit.
12. I want to include sound effects for various actions.

Stretch Goals
1. I want to be able to display a health/mana bar(not a number) that will adjust according to our heroes health/mana.
2. I want to be able to animate the attack options and add more than a few skills. (I currently am making a sprite sheet and turining the animations into gifs<-- a lot of fun actually!)
3. I want our characters or boss to turn slightly red and revert back to their normal color after being hit.




The Journey (Bugs, Fixes, Implementations, Expectations)
1. We got a lot down on day 1 which I am very proud of! Started off by creating a hero class and apply properties and values. One little thing that I ran into was that anytime our characters fought or healed it would go past their mininum or maximum values. For example if Clouds max hp is 200, but whenever we heal him, that number go behind his max health! So in order to fix this I did google and found an answer on stack overflow. In their example someone didn't want a number to go beyond 0. I then applied this method to my own function and it worked splendidly! So I made an if statement like this. if(this.health < this.maxHealth) then this.health = this.maxHealth. Definitely a game changer!

2. Today I noticed that after a battle animation, our characters do not return to their idle position yet. I do have some working theories that I want to test out. Going to implement the current players turn and whenever it is not current players turn have them revert back to their idle form. This is also day 2 and I really want to work on the styling of our battle menu a bit more and giving it a hidden status to where it only shows when it is their turn only. We are also testing out Sephiroth( our bosses) animations and going to create a function where he will randomly select one of our heroes to attack. I think I can create a target [array] and have him choose between those at random. Really excited to get started on Day 2!