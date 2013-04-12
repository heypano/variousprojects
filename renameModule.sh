#/bin.bash
if [ $# -ne 2 ];then 
  echo "Use the following format: renameModule.sh PATH/stringtorename newname (the folder needs to be named stringtorename)"
  echo "Example Use: renameModule.sh /c/Sites/apply/sites/all/modules/thismodule thatmodule"
  exit
fi

#Getting the variables
path=$1
restofpath=${path%%*/}
name=${path##*/}
newname=$2

#move into the folder
cd $path
#move to the parent
cd ..
mkdir $newname
cp $name/* $newname
rm -rf $name
cd $newname

for f in $(find . -name "$name.*"); do echo $f; done

#rename the folder
#for file in *
#do
#	echo $file
#done

#for file in *
#do 
#  if [[ $file == MasterAfter_* ]] ; then
#    res=${file/MasterAfter_/} 
#    mv $file $res
#  fi
#done