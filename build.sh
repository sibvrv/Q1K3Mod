set -e

# Compile the pack_map
gcc -std=c99 ./Tools/pack_map.c -lm -o ./Tools/pack_map

# Pack maps
./Tools/pack_map assets/maps/m1.map build/m1.plb
./Tools/pack_map assets/maps/m2.map build/m2.plb

# Concat all maps into one file
cat \
	build/m1.plb \
	build/m2.plb \
	> build/l
