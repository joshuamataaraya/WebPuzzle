<?php
/**
 * This is part of https://github.com/nilopc/NilPortugues_Javascript_Multiple_JCrop
 *
 * (c) 2013 Nil Portugués Calderó <contact@nilportugues.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	/*
	 * SAVING THE SELECTIONS TO SEPARATE FILES
	 * (I'm aware of the naive code going on here...)
	 *
	 */
	include('image.class.php');
	$image = new imageClass();

	file_put_contents('image1',file_get_contents($_POST['jcrop-src'][0]));
	file_put_contents('image2',file_get_contents($_POST['jcrop-src'][1]));

	$_POST['jcrop-src'][0] = 'image1';
	$_POST['jcrop-src'][1] = 'image2';
 
	// IMAGE 1
	$filename = $_POST['jcrop-src'][0];   
	$src1 = $image->setImage($filename)
		      ->crop($_POST['jcrop-x'][0],$_POST['jcrop-y'][0],$_POST['jcrop-x2'][0],$_POST['jcrop-y2'][0])
		      ->resize(116,116,'exact')
		      ->save('./generated','demo.exact-resize_1',$image->getFileType());

	//IMAGE 2
	$filename = $_POST['jcrop-src'][1];   
	$src2 = $image->setImage($filename)
              ->crop($_POST['jcrop-x'][1],$_POST['jcrop-y'][1],$_POST['jcrop-x2'][1],$_POST['jcrop-y2'][1])
	      ->resize(512,288,'exact')
              ->save('./generated','demo.exact-resize_2',$image->getFileType());

	
	/*
	 * *****************************************************************************
	 * RESTORE A CROPPED SELECTION FROM A DATA SOURCE
	 ********************************************************************************
	 If you would like to rebuild the cropped selection; having previously stored (in a database) the cropping points,
	 you'll have to re-calculate the points as follows to load the selection on top of the original image:
	
		$imageSelection = array
		(
			'x' => $_POST['jcrop-x'][1],				//bottom left point
			'y' => $_POST['jcrop-y'][1],				//upper left point
			'x2' => $_POST['jcrop-x'][1]+$_POST['jcrop-x2'][1], 	//bottom right point
			'y2' => $_POST['jcrop-y'][1]+$_POST['jcrop-y2'][1]	//upper right point
		);
	
	*/
	
	//HTML OUTPUT
	echo '<h2>Image Manipulation</h2>';
	echo '<img style="border:1px solid #ccc" src="'.$src1.'"> <br>';
	echo '<img style="border:1px solid #ccc" src="'.$src2.'"> ';

	echo '<pre>';
	print_r($_POST);
	echo '</pre>';
	exit;
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Multiple JCrop with Real-time Preview</title>
<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
	<script src="js/jquery.min.js"></script>

	<!-- The original JCrop Plugin -->
	<script src="js/jquery.Jcrop.js"></script>
	<link href="css/jquery.Jcrop.css" type="text/css" rel="stylesheet" />

	<!-- The JCrop Multiple Plugin -->
	<script src="js/jquery.Jcrop.multiple.js"></script>
	<link href="css/jquery.Jcrop.custom.css" type="text/css" rel="stylesheet"/>
</head>
<body>
<a href="https://github.com/nilopc/NilPortugues_Javascript_Multiple_JCrop"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>
<h1>Multiple JCrop with Real-time Preview</h1>
<h2>I. Configuration</h2>
<p>
All you need to do to configure this JCrop modification is:</p>
<ol>
	<li>Include <strong><a href="js/jquery.min.js">JQuery</a></strong>, the original JCrop <strong><a href="js/jquery.Jcrop.js">Javascript</a></strong> and <strong><a href="css/jquery.Jcrop.css">CSS</a></strong> and the current plugin files.
<pre>
	&lt;script src=&quot;js/jquery.min.js&quot;&gt;&lt;/script&gt;

	&lt;!-- Original JCrop Plugin --&gt;
	&lt;script src=&quot;js/jquery.Jcrop.js&quot;&gt;&lt;/script&gt;
	&lt;link href=&quot;css/jquery.Jcrop.css&quot; type=&quot;text/css&quot; rel=&quot;stylesheet&quot; /&gt;

	&lt;!-- JCrop Multiple Plugin --&gt;
	&lt;script src=&quot;js/jquery.Jcrop.multiple.js&quot;&gt;&lt;/script&gt;
	&lt;link href=&quot;css/jquery.Jcrop.custom.css&quot; type=&quot;text/css&quot; rel=&quot;stylesheet&quot;/&gt;
</pre>
	</li>
	<li>Edit the CSS in <strong><a href="css/jquery.Jcrop.custom.css">jquery.Jcrop.custom.css</a></strong> to fit your needs.</li>
	<li>Edit the configuration array in <strong><a href="js/jquery.Jcrop.multiple.js">jquery.Jcrop.multiple.js</a></strong> to match any changes in the CSS.</li>
	<li>Create a JCrop Item using HTML and the HTML5 data attributes.
<pre>
&lt;form method=&quot;post&quot;&gt;
	&lt;!-- JCROP ITEM # 1--&gt;
	&lt;div class=&quot;jcrop-item&quot;&gt;
	&lt;h4&gt;PREVIEW PHOTO&lt;/h4&gt;

		&lt;!-- This is the image we're attaching Jcrop to --&gt;
		&lt;div&gt;		
			&lt;div class=&quot;jcrop-preview-pane&quot; class=&quot;jcrop-transparent-bg&quot;&gt;
				&lt;div class=&quot;jcrop-preview-container&quot;&gt;
					&lt;img class=&quot;jcrop-preview&quot; data-height=&quot;116&quot; data-width=&quot;116&quot; /&gt;
				&lt;/div&gt;				
			&lt;/div&gt;	
			&lt;img class=&quot;jcrop-box&quot; src=&quot;demo.png&quot;
			     data-height=&quot;300&quot; data-width=&quot;300&quot;
			     data-x='7' data-y='0' data-x2='225' data-y2='225'
			/&gt;
		&lt;/div&gt;	
		&lt;input type=&quot;hidden&quot; class=&quot;jcrop-src&quot; name=&quot;jcrop-src[]&quot; /&gt;
		&lt;input type=&quot;hidden&quot; class=&quot;jcrop-x&quot; name=&quot;jcrop-x[]&quot; /&gt;
		&lt;input type=&quot;hidden&quot; class=&quot;jcrop-y&quot; name=&quot;jcrop-y[]&quot; /&gt;
		&lt;input type=&quot;hidden&quot; class=&quot;jcrop-x2&quot; name=&quot;jcrop-x2[]&quot; /&gt;
		&lt;input type=&quot;hidden&quot; class=&quot;jcrop-y2&quot; name=&quot;jcrop-y2[]&quot; /&gt;
	&lt;/div&gt;
	&lt;div style=&quot;clear:left&quot;&gt;&lt;/div&gt;
	&lt;input type=&quot;submit&quot; value=&quot;Crop Images&quot;/&gt;	
&lt;/form&gt;
</pre>
	</li>
	<li>Hit the submit button and process the form's data server-side!</li>
</ol>

<hr>
<h2>II. Data Attributes</h2>
<p>HTML5 data attributes play an important role in the configuration of this plugin. Two elements are targetted by the script to read the data attributes from.</p>
<h3>.jcrop-preview</h3>
<style type="text/css">
table { border-collapse:collapse; }
table td, 
table th { border:1px solid black;padding:5px; }
table th {background-color:#eee;text-align:left;}
</style>
<table>
<thead>
	<tr>
		<th>data-attribute</th>
		<th>Use</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>data-height</td>
		<td>Mandatory</td>
		<td>Height value in pixels used to crop the image.</td>
	</tr>
	<tr>
		<td>data-width</td>
		<td>Mandatory</td>
		<td>Width value in pixels used to crop the image.</td>
	</tr>
</tbody>
</table>

<h3>.jcrop-box</h3>
<table>
<thead>
	<tr>
		<th>data-attribute</th>
		<th>Use</th>
		<th>Description</th>
	</tr>
</thead>
<tbody>
	<tr>
		<td>data-height</td>
		<td>Mandatory</td>
		<td>Height value in pixel used to place the image inside the DIV.</td>
	</tr>
	<tr>
		<td>data-width</td>
		<td>Mandatory</td>
		<td>Width value in pixel used to place the image inside the DIV.</td>
	</tr>
	<tr>
		<td>data-x</td>
		<td>Optional</td>
		<td>X Axis start value based on the selected image area. Used to set or reload a stored area selection.</td>
	</tr>
	<tr>
		<td>data-y</td>
		<td>Optional</td>
		<td>Y Axis start value based on the selected image area. Used to set or reload a stored area selection.</td>
	</tr>
	<tr>
		<td>data-x2</td>
		<td>Optional</td>
		<td>Value containing the width of the selected image area. Used to set or reload a stored area selection.</td>
	</tr>
	<tr>
		<td>data-y2</td>
		<td>Optional</td>
		<td>Value containing the height of the selected image area. Used to set or reload a stored area selection.</td>
	</tr>
</tbody>
</table>
<br><br>
<hr>
<h2>III. Demonstration</h2>
<form method="post"STYLE="PADDING:0 20px 10px 20px; border:1px solid #ddd;">

	<h4>LOAD IMAGE PATH</h4>
	<input type="text" class="jcrop-image kcfinder-open" data-kcfinder='http://path/to/kcfinder/browse.php?type=images' style="width:600px">
	<p><i>This field should hold the source to the image. Could be hidden and combined with other scripts, such as <a href="http://kcfinder.sunhater.com/">KCFinder</a></i></p>
	<hr>	

	<!-- JCROP ITEM # 1-->
	<div class="jcrop-item">
	<h4>PREVIEW PHOTO</h4>

		<!-- This is the image we're attaching Jcrop to -->
		<div>		
			<div class="jcrop-preview-pane" class="jcrop-transparent-bg">
				<div class="jcrop-preview-container">
					<img class="jcrop-preview" data-height="116" data-width="116" />
				</div>				
			</div>	
			<img class="jcrop-box" src="demo.png"
			     data-height="300" data-width="300"
			     data-x='7' data-y='0' data-x2='225' data-y2='225'
			/>
		</div>	
		<input type="hidden" class="jcrop-src" name="jcrop-src[]" />
		<input type="hidden" class="jcrop-x" name="jcrop-x[]" />
		<input type="hidden" class="jcrop-y" name="jcrop-y[]" />
		<input type="hidden" class="jcrop-x2" name="jcrop-x2[]" />
		<input type="hidden" class="jcrop-y2" name="jcrop-y2[]" />
	</div>
	

	<!-- JCROP ITEM # 2-->
	<div class="jcrop-item">
	<h4>FRONTPAGE PHOTO</h4>

		<!-- This is the image we're attaching Jcrop to -->
		<div>							
			<div class="jcrop-preview-pane" class="jcrop-transparent-bg">
				<div class="jcrop-preview-container">
					<img class="jcrop-preview" data-height="288" data-width="512" />
				</div>
			</div>		
			<img class="jcrop-box" src="demo.png" 
			     data-height="300" data-width="300" 
			     data-x='0' data-y='40' data-x2='258' data-y2='145'
			/>
		</div>	
		<input type="hidden" class="jcrop-src" name="jcrop-src[]" />
		<input type="hidden" class="jcrop-x" name="jcrop-x[]" />
		<input type="hidden" class="jcrop-y" name="jcrop-y[]" />
		<input type="hidden" class="jcrop-x2" name="jcrop-x2[]" />
		<input type="hidden" class="jcrop-y2" name="jcrop-y2[]" />
	</div>

	<div style="clear:left"></div>
	<hr>
	<input type="submit" value="Crop Images"/>	
</form>


</body>
</html>
