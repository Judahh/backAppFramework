export interface PersistenceAdapter {
	update(item);

	readArray():Array<any>;
	
	deleteArray();

	addItem(item);

	deleteItem(item);
}