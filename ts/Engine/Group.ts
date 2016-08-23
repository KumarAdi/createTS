/** Class that holds a group of Gameobjects */
class Group extends Entity{
    /** Array of memberobjects */
    public members: Entity[];

    constructor(){
        super();
        this.members = [];
    }

    /** Update all members */
    public update() {
        for(var entity of this.members){
            entity.update();
        }
    }

    /** draw all members */
    public draw(stage) {
        for(var entity of this.members){
            entity.draw(stage);
        }
    }

    /**
    * Add a member to the group
    * @param newMember Entity (including another group) to be added to this group
    */
    public add(newMember:Entity) {
        this.members.push(newMember);
        newMember.start();
    }
}
