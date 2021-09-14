set -e

function makeMDL() {
  php Tools/pack_model.php $@
}

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

# Pack models
makeMDL assets/models/boulder.obj build/boulder.rmf
makeMDL assets/models/q.obj build/q.rmf
makeMDL assets/models/grenade.obj build/grenade.rmf
makeMDL \
	assets/models/hound_run_1.obj \
	assets/models/hound_run_2.obj \
	build/hound.rmf	
makeMDL \
	assets/models/unit_idle.obj \
	assets/models/unit_run_1.obj \
	assets/models/unit_run_2.obj \
	assets/models/unit_run_3.obj \
	assets/models/unit_run_4.obj \
	assets/models/unit_fire.obj \
	build/unit.rmf

makeMDL assets/models/box.obj build/box.rmf
makeMDL assets/models/nailgun.obj build/nailgun.rmf
makeMDL \
	assets/models/torch_1.obj \
	assets/models/torch_2.obj \
	assets/models/torch_3.obj \
	build/torch.rmf

# Concat all models into one file
cat \
	build/boulder.rmf \
	build/unit.rmf \
	build/grenade.rmf \
	build/q.rmf \
	build/hound.rmf \
	build/box.rmf \
	build/nailgun.rmf \
	build/torch.rmf \
	> build/m
