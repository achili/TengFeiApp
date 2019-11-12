import BaseEntity from "../../_base/BaseEntity";
import UserRole from "../role/UserRole";

export default class UserAccess extends BaseEntity {
  constructor(args) {
    super(args);
    this.active = null;
    this.role = new UserRole();
    this.featureType = null;
  }

  render() {
    BaseEntity.prototype.render.call(this, obj);
    this.renderEntity("role", UserRole);
  }

  getTAG() {
    return "UserAccess";
  }

  getForm() {
    let form = {
      active: this.active,
      roleId: this.role.id,
      nodeId: this.node.id
    };
    if (this.id) {
      form.id = this.id;
    }
    return form;
  }
}
