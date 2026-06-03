export class NameInUseError extends Error {
  constructor() {
    super(`The received group name is already in use`);
    this.name = 'NameInUseError';
  }
}
