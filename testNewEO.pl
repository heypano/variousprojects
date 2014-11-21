#! /usr/bin/perl

use strict;
use warnings;
use FlyLoader;

my $newTrafficProfile = SF::EOHandler::newObject('TrafficProfile');
$newTrafficProfile->{data}{name} = "Global Traffic Profile (autogen)2";
SF::EOHandler::storeObject($newTrafficProfile);