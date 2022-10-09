#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Aug 11 16:13:00 2021

@author: @nkatagithub
"""
from bs4 import BeautifulSoup
import requests


allinks = []
qmatches = {}

url = 'http://www.statarea.com/predictions'
page = requests.get(url)
#soup = BeautifulSoup(open('index.html'), features= 'lxml')

soup = BeautifulSoup(page.text, features = 'lxml')
rows = soup.findAll('div', class_='hostteam')

for row in rows:
    l = row.find('a')
    link = l['href']
    allinks.append(link)
    #print(link)
    #print('')
print('Finished match list')
for lnk in allinks:
#for i in range(0, 1): #for small sample
    try:
        page = requests.get(lnk)
        soup2 = BeautifulSoup(page.text, features='lxml')
        #soup2 = BeautifulSoup(open('index2.html'), features= 'lxml')
    
        #match title
        mm = soup2.find('div', class_='datacotainerheader')
        match = mm.text
    
        rowdiv = soup2.findAll('div', class_='matchitem')
        tgoals = []
    
        for row1 in rowdiv:

            ht = row1.find('div', class_='hostteam')
            gl = ht.find('div', class_='goals')
            g = gl.text   
            #print(row1)
            gt = row1.find('div', class_='guestteam')
            gl1 = gt.find('div', class_='goals')
            g1 = gl1.text 
            #print(g)
            #print(g1)
            ttgoals = int(g)+int(g1)
            tgoals.append(ttgoals)
            #print(ttgoals)
            #print('')
        n = len(tgoals)
        #print(n)
        if n<5:
            pass
        else:
            if min(tgoals[0:5])<2:
                #print('[failed match]: '+match)
                #print('')
                pass
            else:
                print('[qualified match]: '+match)
                #print('[link qualified]: '+lnk)
                print("")
    except:
        print('[Error]'+lnk)
        print('')
        continue



