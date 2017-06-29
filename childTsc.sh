file="app/tsconfig.json"
if [ -f "$file" ]
then
	tsc --p app/tsconfig.json
else
	echo "$file not found."
fi