#!/usr/bin/perl

use warnings;
use strict;

my $pattern = "(.+)(2014-09-08)(.+)";
my $location = "/Users/ppapadat/Dropbox/Camera Uploads/";

for my $file(< "$location*" >){
	if($file =~ $pattern){
		my $newFile = "$1"."2014-08-09$3";
		my $command = "mv \"$file\" \"$newFile\"\n";
		print "Command is $command\n";
		system($command);
	}
}
