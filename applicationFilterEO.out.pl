#!/usr/bin/perl

use warnings;
use strict;
use Data::Dumper;


my $exportedEO = {
          'data' => {
                    'appEntries' => [
                                    {
                                      'types' => [
                                                 {
                                                   'count' => 0,
                                                   'name' => 'Client Application',
                                                   'type' => 'isClient'
                                                 }
                                               ],
                                      'risks' => [
                                                 {
                                                   'count' => 0,
                                                   'name' => 'Low',
                                                   'risk' => 2
                                                 }
                                               ],
                                      'value' => '',
                                      'name' => 'Risks:Low Types:Client Application Business Relevance:Low Categories:download manager Tags:adds/installs other software',
                                      'type' => 'filter',
                                      'productivities' => [
                                                          {
                                                            'count' => 0,
                                                            'name' => 'Low',
                                                            'productivity' => 2
                                                          }
                                                        ],
                                      'tags' => [
                                                {
                                                  'count' => 0,
                                                  'tagType' => 'tag',
                                                  'tagId' => 46,
                                                  'tagName' => 'adds/installs other software'
                                                },
                                                {
                                                  'count' => 0,
                                                  'tagType' => 'category',
                                                  'tagId' => 45,
                                                  'tagName' => 'download manager'
                                                }
                                              ]
                                    },
                                    {
                                      'types' => [
                                                 {
                                                   'count' => 1,
                                                   'name' => 'Client Application',
                                                   'type' => 'isClient'
                                                 }
                                               ],
                                      'risks' => [
                                                 {
                                                   'count' => 1,
                                                   'name' => 'Low',
                                                   'risk' => 2
                                                 }
                                               ],
                                      'value' => '',
                                      'name' => 'Risks:Low Types:Client Application Business Relevance:Low Categories:download manager',
                                      'type' => 'filter',
                                      'productivities' => [
                                                          {
                                                            'count' => 1,
                                                            'name' => 'Low',
                                                            'productivity' => 2
                                                          }
                                                        ],
                                      'tags' => [
                                                {
                                                  'count' => 1,
                                                  'tagType' => 'category',
                                                  'tagId' => 45,
                                                  'tagName' => 'download manager'
                                                }
                                              ]
                                    },
                                    {
                                      'types' => [
                                                 {
                                                   'count' => 470,
                                                   'name' => 'Client Application',
                                                   'type' => 'isClient'
                                                 }
                                               ],
                                      'value' => '',
                                      'name' => 'Types:Client Application',
                                      'type' => 'filter'
                                    },
                                    {
                                      'types' => [
                                                 {
                                                   'count' => 0,
                                                   'name' => 'Client Application',
                                                   'type' => 'isClient'
                                                 },
                                                 {
                                                   'count' => 0,
                                                   'name' => 'Web Application',
                                                   'type' => 'isWebApp'
                                                 }
                                               ],
                                      'value' => '2218',
                                      'filter' => '',
                                      'name' => '5by5 Radio',
                                      'risks' => [
                                                 {
                                                   'count' => 0,
                                                   'name' => 'Medium',
                                                   'risk' => 3
                                                 }
                                               ],
                                      'decrypted_only_detector' => 1,
                                      'type' => 'app',
                                      'productivities' => [
                                                          {
                                                            'count' => 0,
                                                            'name' => 'Low',
                                                            'productivity' => 2
                                                          }
                                                        ]
                                    }
                                  ],
                    'name' => 'TestFilter'
                  },
          'uuid' => '6727b41a-22f9-11e4-a8f2-b6efe9c23f38'
        };

$Data::Dumper::Sortkeys = 1;        
print Dumper($exportedEO);