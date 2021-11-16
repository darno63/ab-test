#!/bin/bash

## Set Base Directory
DIR="${0%/*}/../"

### Help
Help(){
  echo "Copies chosen images into /public/images/variants"
  echo "Usage: updatepics.sh -a firstimage.jpg -b secondimage.jpg"
  echo "options:"
  echo "a     Sets pictures to first bucket"
  echo "b     Sets pictures to second bucket"
}

### Convert option
CopyPic() {
  MIME=${1##*.}
  if [[ $MIME =~ [png/jpg] ]]; then
    cp $DIR/pictures/$1 $DIR/app/public/images/variants/picture$2.$MIME
  else
    echo "Error: v$2 is not a image file"
  fi
}

# Get the options
while getopts ":ha:b:" option; do
  case $option in
     h) Help
        exit;;
     a) CopyPic $OPTARG 1;;
     b) CopyPic $OPTARG 2;;
    /?) echo "Error: Invalid option"
        exit;;
  esac
done
