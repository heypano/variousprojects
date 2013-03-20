#/bin.bash
if [ -n $1 ];then 
	echo $1
fi


for file in *
do 
	if [[ $file == MasterAfter_* ]] ; then
		res=${file/MasterAfter_/} 
		mv $file $res
	fi
done