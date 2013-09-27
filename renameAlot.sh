#/bin.bash
if [ -n $1 ];then 
	echo $1
fi


for file in *
do 
	if [[ $file == MasterAfter_* ]] ; then
<<<<<<< HEAD
		res=${file/MasterAfter_/} 
		mv $file $res
	fi
=======
		res=`echo $file|cut -d'_' -f 2 ` 
		mv $file $res
	fi
	#mv "$file" "${file#linux_}" 
>>>>>>> 892ee085c07c64fb380ef72d7ae7099e3f48df93
done