#/bin.bash
if [ -n $1 ];then 
	echo $1
fi


for file in *
do 
	if [[ $file == MasterAfter_* ]] ; then
		res=`echo $file|cut -d'_' -f 2 ` 
		mv $file $res
	fi
	#mv "$file" "${file#linux_}" 
done