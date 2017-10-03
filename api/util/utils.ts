interface Array<T> {
  type: any;
  getType(): string;
}

interface String {
  replaceAll(search:string, replacement:string): string;
}

interface JQueryStatic {
  cache;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

Array.prototype.getType = function () {
  return this.type;
}